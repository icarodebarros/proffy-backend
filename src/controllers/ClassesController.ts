import { Request, Response } from 'express';
import ClassesService from '../services/classes.service';
import { User } from '../entities/user.cls';
import { Class } from '../entities/class.cls';

export interface IScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export interface IClassFilters {
    week_day: number;
    subject: string;
    time: string;
    [key: string]: any; // atributo genérico
}

export default class ClassesController {

    private classesService: ClassesService;

    constructor() {
        this.classesService = new ClassesService();
    }

    public index = (request: Request, response: Response, next: (err?: any) => void) => {
        let filters = request.query as IClassFilters;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        this.classesService.index(filters)
            .then((classes) => {
                return response.json(classes);
            })
            .catch(next);
    }
    
    public create = (request: Request, response: Response, next: (err?: any) => void) => {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const user = new User(name, avatar, whatsapp, bio);
        const cls = new Class(subject, cost);
        const class_schedule = <IScheduleItem[]>schedule;

        this.classesService.create(cls, user, class_schedule)
            .then(() => {
                return response.status(201).send();
            })
            .catch(next);
    }
}