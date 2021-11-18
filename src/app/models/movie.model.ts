export class Movie {
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get image(): string {
        return this._image;
    }
    public set image(value: string) {
        this._image = value;
    }
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }
    public get year(): string {
        return this._year;
    }
    public set year(value: string) {
        this._year = value;
    }
    public get crew(): string {
        return this._crew;
    }
    public set crew(value: string) {
        this._crew = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    
    constructor(private _id: string,private _title: string,private _image: string,private _year: string, private _crew: string, private _description: string) {

    }
}