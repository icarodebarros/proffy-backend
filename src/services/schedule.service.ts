import Knex from "knex";
import db from "../database/connection";
import { ScheduleItem } from "../entities/scheduleItem.cls";

export default class ScheduleService {

    async create(schedule: ScheduleItem[], trx?: Knex.Transaction): Promise<number[]> {
        if (!trx) {
            trx = await db.transaction();
        }

        const insertedSchedulesIds = await trx('class_schedule').insert(schedule);
    
        return insertedSchedulesIds;
    }
}