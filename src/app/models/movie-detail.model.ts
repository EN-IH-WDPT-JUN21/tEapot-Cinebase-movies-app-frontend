export interface MovieDetail {
    id: string,
    title: string,
    fullTitle: string,
    type: string,
    year: string,
    image: string,
    releaseDate: string,
    runtimeMins: string,
    runtimeStr: string,
    plot: string,
    awards: string,
    directors: string,
    writers: string,
    stars: string,
    genres: string,
    imdbRating: string,
    tvSeriesInfo: {
        yearEnd: number,
        creators: string,
        seasons: number[]
    }
}
