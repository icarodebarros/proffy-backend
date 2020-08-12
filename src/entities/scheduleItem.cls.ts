export class ScheduleItem {
    
    public id: any;
    public week_day: number;
    public from: number;
    public to: number;
    public class_id: any;

    constructor(week_day: number, from: number, to: number) {
        this.week_day = week_day;
        this.from = from;
        this.to = to;
    }
}