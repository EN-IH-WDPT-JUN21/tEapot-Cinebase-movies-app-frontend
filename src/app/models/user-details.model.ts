
export default class UserDetails {
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    
    public get imageId(): number {
        return this._imageId;
    }
    public set imageId(value: number) {
        this._imageId = value;
    }

    public get bio(): string {
        return this._bio;
    }
    public set bio(value: string) {
        this._bio = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }

    constructor(private _id: number, private _email: string, private _username: string,  private _bio: string, private _imageId: number, ) { }

}