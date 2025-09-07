
export interface RootObject {
    success: boolean;
    data: Data;
}

interface Data {
    query: string;
    albums: Albums;
    tracks: Tracks;
    artists: Artists;
    playlists: Playlists;
    stories: Stories;
    most_popular: Mostpopular;
    switchTo: null;
}

interface Mostpopular {
    limit: number;
    offset: number;
    analytics: Analytics;
    total: number;
    items: Item6[];
}

interface Item6 {
    type: string;
    content: Content;
}

interface Content {
    type: string;
    picture?: null | string;
    image?: Image | Image3 | null;
    name?: string;
    slug?: string;
    albums_count?: number;
    id: number | string;
    maximum_bit_depth?: number;
    media_count?: number;
    artist?: Artist;
    artists?: Artist2[];
    upc?: string;
    released_at?: number;
    label?: Label;
    title?: string;
    qobuz_id?: number;
    version?: null | string;
    url?: string;
    duration?: number;
    parental_warning?: boolean;
    popularity?: number;
    tracks_count?: number;
    genre?: Genre;
    maximum_channel_count?: number;
    maximum_sampling_rate?: number;
    articles?: Article[];
    release_date_original?: string;
    release_date_download?: string;
    release_date_stream?: string;
    purchasable?: boolean;
    streamable?: boolean;
    previewable?: boolean;
    sampleable?: boolean;
    downloadable?: boolean;
    displayable?: boolean;
    purchasable_at?: number;
    streamable_at?: number;
    hires?: boolean;
    hires_streamable?: boolean;
    copyright?: string;
    performers?: string;
    audio_info?: Audioinfo;
    performer?: Performer;
    article_ids?: Articleids;
    album?: Album2;
    work?: null;
    composer?: Performer;
    isrc?: string;
    track_number?: number;
    media_number?: number;
    release_date_purchase?: string;
    maximum_technical_specifications?: string;
}

interface Album2 {
    image: Image2;
    maximum_bit_depth: number;
    media_count: number;
    artist: Artist;
    upc: string;
    released_at: number;
    label: Label;
    title: string;
    qobuz_id: number;
    version: null;
    duration: number;
    parental_warning: boolean;
    tracks_count: number;
    popularity: number;
    genre: Genre;
    maximum_channel_count: number;
    id: string;
    maximum_sampling_rate: number;
    previewable: boolean;
    sampleable: boolean;
    displayable: boolean;
    streamable: boolean;
    streamable_at: number;
    downloadable: boolean;
    purchasable_at: null;
    purchasable: boolean;
    release_date_original: string;
    release_date_download: string;
    release_date_stream: string;
    release_date_purchase: string;
    hires: boolean;
    hires_streamable: boolean;
    maximum_technical_specifications: string;
}

interface Articleids {
    LLS: number;
    SMR: number;
    SM2: number;
}

interface Article {
    id: number;
    url: string;
    price: number;
    currency: string;
    type: string;
    label: string;
    description: string;
}

interface Stories {
    limit: number;
    offset: number;
    analytics: Analytics;
    total: number;
    items: Item5[];
}

interface Item5 {
    id: string;
    section_slugs: string[];
    title: string;
    description_short: string;
    authors: Author[];
    image: string;
    images: Image4[];
    display_date: number;
}

interface Image4 {
    format: string;
    url: string;
}

interface Author {
    id: string;
    name: string;
    slug: string;
}

interface Playlists {
    limit: number;
    offset: number;
    analytics: Analytics;
    total: number;
    items: Item4[];
}

interface Item4 {
    image_rectangle_mini: string[];
    is_published: boolean;
    featured_artists: Artist[];
    description: string;
    created_at: number;
    timestamp_position: number;
    images300: string[];
    duration: number;
    updated_at: number;
    published_to: number;
    genres: Genre2[];
    image_rectangle: string[];
    id: number;
    slug: string;
    owner: Performer;
    users_count: number;
    images150: string[];
    images: string[];
    is_collaborative: boolean;
    stores: string[];
    tags: Tag[];
    tracks_count: number;
    name: string;
    is_public: boolean;
    published_from: number;
    is_featured: boolean;
    public_at?: number;
}

interface Tag {
    featured_tag_id: string;
    name_json: string;
    slug: string;
    color: string;
    genre_tag: Genretag | Genretag | null;
    is_discover: boolean;
}

interface Genretag {
    genre_id: string;
    name: string;
}

interface Genre2 {
    id: number;
    color: string;
    name: string;
    path: number[];
    slug: string;
    percent: number;
}

interface Artists {
    limit: number;
    offset: number;
    analytics: Analytics;
    total: number;
    items: Item3[];
}

interface Item3 {
    picture: null | string;
    image: Image3 | null;
    name: string;
    slug: string;
    albums_count: number;
    id: number;
}

interface Image3 {
    small: string;
    medium: string;
    large: string;
    extralarge: string;
    mega: string;
}

interface Tracks {
    limit: number;
    offset: number;
    analytics: Analytics;
    total: number;
    items: Item2[];
}

interface Item2 {
    maximum_bit_depth: number;
    copyright: string;
    performers: string;
    audio_info: Audioinfo;
    performer: Performer;
    album: Album;
    work: null;
    composer: Performer;
    isrc: string;
    title: string;
    version: null;
    duration: number;
    parental_warning: boolean;
    track_number: number;
    maximum_channel_count: number;
    id: number;
    media_number: number;
    maximum_sampling_rate: number;
    release_date_original: string;
    release_date_download: string;
    release_date_stream: string;
    release_date_purchase: string;
    purchasable: boolean;
    streamable: boolean;
    previewable: boolean;
    sampleable: boolean;
    downloadable: boolean;
    displayable: boolean;
    purchasable_at: number;
    streamable_at: number;
    hires: boolean;
    hires_streamable: boolean;
    maximum_technical_specifications?: string;
}

interface Album {
    image: Image2;
    maximum_bit_depth: number;
    media_count: number;
    artist: Artist;
    upc: string;
    released_at: number;
    label: Label;
    title: string;
    qobuz_id: number;
    version: null;
    duration: number;
    parental_warning: boolean;
    tracks_count: number;
    popularity: number;
    genre: Genre;
    maximum_channel_count: number;
    id: string;
    maximum_sampling_rate: number;
    previewable: boolean;
    sampleable: boolean;
    displayable: boolean;
    streamable: boolean;
    streamable_at: number;
    downloadable: boolean;
    purchasable_at: null;
    purchasable: boolean;
    release_date_original: string;
    release_date_download: string;
    release_date_stream: string;
    release_date_purchase: string;
    hires: boolean;
    hires_streamable: boolean;
    maximum_technical_specifications?: string;
}

interface Image2 {
    small: string;
    thumbnail: string;
    large: string;
}

interface Performer {
    name: string;
    id: number;
}

interface Audioinfo {
    replaygain_track_peak: number;
    replaygain_track_gain: number;
}

interface Albums {
    limit: number;
    offset: number;
    analytics: Analytics;
    total: number;
    items: Item[];
}

interface Item {
    maximum_bit_depth: number;
    image: Image;
    media_count: number;
    artist: Artist;
    artists: Artist2[];
    upc: string;
    released_at: number;
    label: Label;
    title: string;
    qobuz_id: number;
    version: null;
    url: string;
    duration: number;
    parental_warning: boolean;
    popularity: number;
    tracks_count: number;
    genre: Genre;
    maximum_channel_count: number;
    id: string;
    maximum_sampling_rate: number;
    articles: any[];
    release_date_original: string;
    release_date_download: string;
    release_date_stream: string;
    purchasable: boolean;
    streamable: boolean;
    previewable: boolean;
    sampleable: boolean;
    downloadable: boolean;
    displayable: boolean;
    purchasable_at: number;
    streamable_at: number;
    hires: boolean;
    hires_streamable: boolean;
}

interface Genre {
    path: number[];
    color: string;
    name: string;
    id: number;
    slug: string;
}

interface Label {
    name: string;
    id: number;
    albums_count: number;
    supplier_id: number;
    slug: string;
}

interface Artist2 {
    id: number;
    name: string;
    roles: string[];
}

interface Artist {
    image: null;
    name: string;
    id: number;
    albums_count: number;
    slug: string;
    picture: null;
}

interface Image {
    small: string;
    thumbnail: string;
    large: string;
    back: null;
}

interface Analytics {
    search_external_id: string;
}

enum Quality {
    FLAC = 27,
}

class Squid {
    async search({
        query,
        offset = 0,
    }: {
        query: string
        offset?: number
    }) {
        const res = await fetch(`https://qobuz.squid.wtf/api/get-music?q=${encodeURIComponent(query)}&offset=${offset}`)
        if (!res.ok) {
            return { success: false, data: null };
        }
        const data = await res.json() as RootObject;
        return { success: true, data: data.data };
    }

    async download(trackId: number, quality: Quality = Quality.FLAC) {
        const res = await fetch(`https://qobuz.squid.wtf/api/download-music?track_id=${trackId}&quality=${quality}`);
        if (!res.ok) {
            return { success: false, url: null };
        }
        const data = await res.json() as { data: { url: string } };
        return { success: true, url: data.data.url };
    }
}

export { Squid }