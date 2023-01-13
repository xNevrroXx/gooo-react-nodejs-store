import {MysqlError, PoolConnection} from "mysql";

const mysql = require("mysql");
const dbPool = require("./index");

class TokenActions {
    async saveToken(userId: number, refreshToken: string, timestamp: string) {
        const isExistToken = await this.isExistToken(userId);
        if(isExistToken) {
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    const saveTokenStringSQL = `UPDATE refresh_token SET value = ? WHERE user_id = ?`;
                    const saveTokenQuerySQL = mysql.format(saveTokenStringSQL, [refreshToken, userId]);

                    connection.query(saveTokenQuerySQL, (error, result) => {
                        if(error) {
                            reject(error);
                        }

                        resolve(result);
                    })
                })
            })
        }
        else {
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    const saveTokenStringSQL = `INSERT INTO refresh_token (user_id, value, created_at) VALUES (?, ?, ?)`;
                    const saveTokenQuerySQL = mysql.format(saveTokenStringSQL, [userId, refreshToken, timestamp]);

                    connection.query(saveTokenQuerySQL, (error, result) => {
                        if(error) {
                            reject(error);
                        }

                        resolve(result);
                    })
                })
            })
        }
    }
    async isExistToken(userId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const findTokenQuerySQL = `SELECT value FROM refresh_token WHERE user_id=${userId}`;

                connection.query(findTokenQuerySQL, (error, result) => {
                    if(error) {
                        reject(error);
                    }

                    resolve(result.length !== 0);
                })
            })
        })
    }
}

module.exports = new TokenActions();