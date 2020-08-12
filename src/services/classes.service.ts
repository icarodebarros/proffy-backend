import { IClassFilters, IScheduleItem } from '../controllers/ClassesController';
import convertHourToMinutes from '../utils/convertHourToMinutes';
import db from '../database/connection';
import UsersService from './users.service';
import { User } from '../entities/user.cls';
import { Class } from '../entities/class.cls';
import { ScheduleItem } from '../entities/scheduleItem.cls';
import ScheduleService from './schedule.service';

export default class ClassesService {

    private usersService: UsersService;
    private scheduleService: ScheduleService;

    constructor() {
        this.usersService = new UsersService();
        this.scheduleService = new ScheduleService();
    }
    
    async index(filter: IClassFilters): Promise<any> {
        
        const timeInMinutes = convertHourToMinutes(filter.time);
        
        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(filter.week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]);
            })
            .where('classes.subject', '=', filter.subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return classes;
    }

    async create(cls: Class, user: User, schedule: IScheduleItem[]): Promise<any> {
    
        const trx = await db.transaction();
    
        try {      
            const user_id = await this.usersService.create(user, trx);

            cls.user_id = user_id;

            const insertedClassesIds = await trx('classes').insert(cls);
        
            const class_id = insertedClassesIds[0];
        
            const class_schedule: ScheduleItem[] = schedule.map((item: IScheduleItem) => {
                const scheduleItem = new ScheduleItem(item.week_day,
                    convertHourToMinutes(item.from), convertHourToMinutes(item.to));
                scheduleItem.class_id = class_id;

                return scheduleItem;
            });
        
            await this.scheduleService.create(class_schedule, trx);
        
            await trx.commit();        
        
        } catch (err) {
            console.error(err);
            
            await trx.rollback();

            throw Error('Unexpected error while creating new class');
        }
    
    }

}