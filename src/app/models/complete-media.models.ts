export interface iCompleteMedia {
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
    imDbRating: string,
    tvSeriesInfo: TvSeriesInfo
}

export interface TvSeriesInfo {
    yearEnd: number,
    creators: string,
    seasons: number[]
}

export class CompleteMedia {
    public id!: string;
    public title!: string;
    public fullTitle!: string;
    public type!: string;
    public year!: number;
    public image!: string;
    public releaseDate!: Date;
    public runtimeMins!: string;
    public runtimeStr!: string;
    public plot!: string;
    public awards!: string;
    public directors!: string;
    public writers!: string;
    public stars!: string;
    public genres!: string;
    public imDbRating!: string;
    public tvSeriesInfo!: TvSeriesInfo;

    constructor(rawData: any) {
        Object.assign(this, rawData);
    }
}