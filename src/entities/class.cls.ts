export class Class {
    
    public id: any;
    public subject: string;
    public cost: number;
    public user_id: any;

    constructor(subject: string, cost: number) {
        this.subject = subject;
        this.cost = cost;
    }

}