import mysql, {MysqlError, PoolConnection} from "mysql";

import dbPool from "./index";
import {IUser, IUserCreation} from "../models/IUser";

type TFindUser = {
    email: string,
    id?: never
} | {
    email?: never,
    id: number
}

class UserActions {
    async findUser ({email, id}: TFindUser): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                let findUserStringSQL = "SELECT id, email, password, username, firstname, lastname, created_at as 'createdAt' FROM user WHERE ";

                if (email) findUserStringSQL += `email = "${email}"`;
                else if (id) findUserStringSQL += `id = "${id}"`;

                connection.query(findUserStringSQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result[0]);
                })
            })
        })
    }

    async findAllUsers (): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findUserStringSQL = "SELECT id, email, password, username, firstname, lastname, created_at as 'createdAt' FROM user";

                connection.query(findUserStringSQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }

    async createUser({email, password, username, firstname, lastname, createdAt}: IUserCreation) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findUserQuerySQL = mysql.format("INSERT INTO user (username, email, password, firstname, lastname, created_at) VALUES(?, ?, ?, ?, ?, ?)", [username, email, password, firstname, lastname, createdAt]);

                connection.query(findUserQuerySQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }
}

export default new UserActions();