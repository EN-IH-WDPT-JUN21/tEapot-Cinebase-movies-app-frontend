export interface CompleteMedia {
    imdbId: string,
    title: string,
    fullTitle: string,
    type: string,
    year: number,
    image: string,
    releaseDate: Date,
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