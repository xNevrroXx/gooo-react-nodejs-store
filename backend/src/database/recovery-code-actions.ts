import {MysqlError, PoolConnection} from "mysql";

const mysql = require("mysql");
const dbPool = require("./index");

class RecoveryCodeActions {
    async find(userId: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const findCodeStringSql = `SELECT * FROM user_recovery_code WHERE user_id = ${userId}`;
                connection.query(findCodeStringSql, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }

    async create(userId: number, recoveryCode: number) {
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        const foundRecoveryCode = await this.find(userId);

        if(foundRecoveryCode.length > 0) {
            const updateRecoveryCodeStringSQL = `UPDATE user_recovery_code SET value = ${recoveryCode}, created_at = "${timestamp}"`;
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    connection.query(updateRecoveryCodeStringSQL, (error, result) => {
                        connection.release();

                        if(error) {
                            reject(error);
                        }

                        resolve(result);
                    })
                })
            })
        }
        else {
            const createRecoveryCodeStringSQL = "INSERT INTO user_recovery_code (user_id, value, created_at) VALUES (?, ?, ?)";
            const createRecoveryCodeQuerySQL = mysql.format(createRecoveryCodeStringSQL, [userId, recoveryCode, timestamp]);
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    connection.query(createRecoveryCodeQuerySQL, (error, result) => {
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

    // async reset
}

module.exports = new RecoveryCodeActions();