import {MysqlError, Pool, PoolConnection} from "mysql";

import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const DB_DATABASE = process.env.DB_DATABASE,
    DB_USER = process.env.DB_USER,
    DB_PASSWORD = process.env.DB_PASSWORD,
    DB_HOST = process.env.DB_HOST,
    DB_PORT = process.env.DB_PORT;

const dbPool: Pool = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
})

dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
    if(error) {
        throw error;
    }

    console.log("DB connected successfully: " + connection.threadId);
})

export default {
    getConnection: (callback: (error: MysqlError, connection: PoolConnection) => any) => {
        return dbPool.getConnection(callback);
    }
}