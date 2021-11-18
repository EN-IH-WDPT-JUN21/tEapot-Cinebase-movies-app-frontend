import { SimplifiedMedia } from "./simplified-media.models";

export interface Playlist {
    id: number,
    userId: number,
    name: string,
    movies: SimplifiedMedia[]
}