import {MysqlError, PoolConnection} from "mysql";

const dbPool = require("./index");

async function customQuery(queryStringMYSQL: string) {
    return new Promise((resolve, reject) => {
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

module.exports = customQuery;