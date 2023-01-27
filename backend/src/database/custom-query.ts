import {MysqlError, PoolConnection} from "mysql";

import dbPool from "./index";

async function customQuery(queryStringMYSQL: string): Promise<unknown> {
    return new Promise<unknown>((resolve, reject) => {
        dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
            connection.query(queryStringMYSQL, (error, result) => {
                connection.release();

                if(error) {
                    reject(error);
                }

                resolve(result);
            })
        })
    })
}

export default customQuery;