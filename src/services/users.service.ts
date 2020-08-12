import { User } from "../entities/user.cls";
import Knex from "knex";
import db from "../database/connection";

export default class UsersService {

    async create(user: User, trx?: Knex.Transaction): Promise<number> {
        if (!trx) {
            trx = await db.transaction();
        }

        const insertedUsersIds = await trx('users').insert(user);
    
        return insertedUsersIds[0];
    }
}