import {MysqlError, PoolConnection} from "mysql";

const mysql = require("mysql");
const dbPool = require("./index");

class RecoveryActions {
    async find({userId, recoveryCode}: {userId: number | null, recoveryCode: string | null}): Promise<any[]> {
        return new Promise((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findCodeStringSql = `SELECT * FROM user_recovery_code WHERE `;
                if(userId) findCodeStringSql += `user_id = "${userId}"`;
                else if(recoveryCode) findCodeStringSql += `value = "${recoveryCode}"`;

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

    async create(userId: number, recoveryCode: string) {
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        const foundRecoveryCode = await this.find({userId, recoveryCode: null});

        if(foundRecoveryCode.length > 0) {
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    const updateRecoveryCodeStringSQL = `UPDATE user_recovery_code SET value = ?, created_at = ? WHERE user_id = ?`;
                    const updateRecoveryCodeQuerySQL = mysql.format(updateRecoveryCodeStringSQL, [recoveryCode, timestamp, userId])
                    connection.query(updateRecoveryCodeQuerySQL, (error, result) => {
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

module.exports = new RecoveryActions();