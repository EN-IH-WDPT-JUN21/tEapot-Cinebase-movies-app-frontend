
export default class UserDetails {
    _image: any;
    
    public get image(): any {
        return this._image;
    }
    public set image(value: any) {
        this._image = value;
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

    constructor(private _username: string, private _email: string, private _bio: string) { }

    
}