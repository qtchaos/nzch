// 'niːtʃi/

import { Squid, type RootObject } from "./squid";
import { mkdir } from "node:fs/promises";
import yoctoSpinner from 'yocto-spinner';
import { Listr } from 'listr2';

async function downloadAndSave(url: string, filePath: string) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to download ${url}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const file = Bun.file(filePath);
    await file.write(arrayBuffer);
}

function e(str: string) {
    return str.replace(/\//g, '\u2215')
        .replace(/[\?<>\\:\*\|":]/g, '')
        .replace(/[\x00-\x1f\x80-\x9f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}


async function getAllResults(squid: Squid, query: string, {
    start = 0,
    end = 3,
}) {
    let allResults: RootObject | null = null;
    for (let i = start; i < end; i++) {
        const res = await squid.search({ query, offset: i * 10 });
        if (!res.success || !res.data) {
            console.error("Search failed");
            continue;
        }

        if (i === 0) {
            allResults = res;
        } else if (allResults) {
            allResults.data.albums.items.push(...res.data.albums.items);
            allResults.data.tracks.items.push(...res.data.tracks.items);
        }
    }
    return allResults;
}


async function main() {
    const s = new Squid();
    const query = prompt("Enter the album or artist to search for:\n>") ?? "";
    if (!query) {
        console.error("No query provided");
        process.exit(1);
    }

    const spinner = yoctoSpinner({ text: 'Loading results…' }).start();
    const r = await getAllResults(s, query, { start: 0, end: 3 });
    if (!r || !r.data) {
        console.error("Search failed");
        process.exit(1);
    }
    spinner.success('Loaded results!');

    const albums = r.data.albums.items;
    const tracks = r.data.tracks.items;

    // Reverse albums so the most relevant ones are at the bottom, making it easier to select by index
    albums.toReversed().forEach((album, i) => {
        const length = albums.length - 1;
        const albumName = `${album.title} by ${album.artists.map(a => a.name).join(", ")} ${album.parental_warning ? "[Explicit]" : ""}`;
        console.log(`${length - i}: ${albumName}`);
    });

    const albumIndex = Number(prompt("Enter the album ID to download:\n>") ?? "");
    if (!Number.isInteger(albumIndex) || albumIndex < 0 || albumIndex >= albums.length) {
        console.error("Invalid album ID");
        process.exit(1);
    }

    const selectedAlbumId = albums[albumIndex]!.qobuz_id;

    // Find all tracks that match the selected album id
    const albumTracks = tracks.filter(t => t.album.qobuz_id === selectedAlbumId);
    if (!albumTracks[0]) {
        console.error("No tracks found for the selected album");
        process.exit(1);
    }

    const album = albums[albumIndex]!;
    const s2 = yoctoSpinner({ text: 'Loading…' }).start();
    s2.text = `${album.title} by ${album.artists.map(a => a.name).join(", ")}`;

    if (albumTracks.length != album.tracks_count) {
        const albumName = `${album.title} by ${album.artists.map(a => a.name).join(", ")}`;
        s2.text = `Expanding search for album: ${albumName}`;

        for (let i = 0; i < 5; i++) {
            const expandedResults = await s.search({ query: albumName, offset: i * 10 });
            if (albumTracks.length === album.tracks_count || !expandedResults || !expandedResults.data) {
                break;
            }

            const existingTrackIds = new Set(albumTracks.map(t => t.id));
            albumTracks.push(...expandedResults.data.tracks.items.filter(t => t.album.qobuz_id === selectedAlbumId && !existingTrackIds.has(t.id)));
        }

        s2.text = `Found ${albumTracks.length} tracks for album: ${albumName}`;
    }

    s2.success(`Downloading ${album.title} by ${album.artists.map(a => a.name).join(", ")}`);
    const folderName = `downloads/${e(albumTracks[0].performer.name)} - ${e(albumTracks[0].album.title)}`;
    await mkdir(folderName, { recursive: true });

    albumTracks.sort((a, b) => a.track_number - b.track_number);

    const tasks = new Listr(
        [{
            title: "Album Art",
            task: async (ctx, task) => {
                const albumArtUrl = albumTracks[0]!.album.image.large;
                if (albumArtUrl) {
                    await downloadAndSave(albumArtUrl, `${folderName}/cover.jpg`);
                    task.title = "Album Art";
                } else {
                    task.skip("No album art found");
                }
            }
        }, {
            title: "Tracks",
            task: async (ctx, task) => {
                return new Listr(
                    albumTracks.map(track => ({
                        title: `${track.track_number.toString().padStart(2, "0")} - ${track.title}`,
                        task: async () => {
                            const download = await s.download(track.id);
                            if (!download.success || !download.url) {
                                throw new Error(`Failed to get download link for track ${track.title}`);
                            }
                            const fileName = e(`${track.track_number.toString().padStart(2, "0")} - ${track.title}.flac`);
                            await downloadAndSave(download.url, `${folderName}/${fileName}`);
                        }
                    })), { concurrent: true }
                )
            }
        }], { concurrent: true }
    );
    await tasks.run();
}

main();