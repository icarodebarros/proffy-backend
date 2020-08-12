export class User {
    
    public id: any;
    public name: string;
    public avatar: string;
    public whatsapp: string;
    public bio: string;

    constructor(name: string, avatar: string, whatsapp: string, bio: string) {
        this.name = name;
        this.avatar = avatar;
        this.whatsapp = whatsapp;
        this.bio = bio
    }

}