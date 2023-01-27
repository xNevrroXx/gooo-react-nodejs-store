import {MysqlError, PoolConnection} from "mysql";

import mysql from "mysql";
import dbPool from "./index";

type TIsExistToken = {
    userId: number,
    token?: never
} | {
    userId?: never,
    token: string
}

class TokenActions {
    async isExistToken({userId, token}: TIsExistToken): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findTokenQuerySQL = `SELECT value FROM user_refresh_token WHERE `;
                if(userId) {
                    findTokenQuerySQL += `user_id="${userId}"`;
                }
                else if (token) {
                    findTokenQuerySQL += `value="${token}"`;
                }

                connection.query(findTokenQuerySQL, (error, result) => {
                    if(error) {
                        reject(error);
                    }

                    resolve(result.length !== 0);
                })
            })
        })
    }

    async saveToken(userId: number, refreshToken: string, timestamp: string) {
        const isExistToken = await this.isExistToken({userId});
        if(isExistToken) {
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    const saveTokenStringSQL = `UPDATE user_refresh_token SET value = ? WHERE user_id = ?`;
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
                    const saveTokenStringSQL = `INSERT INTO user_refresh_token (user_id, value, created_at) VALUES (?, ?, ?)`;
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
}

export default new TokenActions();