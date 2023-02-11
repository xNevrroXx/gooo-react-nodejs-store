import mysql from "mysql";
// own modules
import dbPool from "./index";
// types
import {IRecoveryData, IRecoveryDataCreation, IRecoveryDataDB} from "../models/IRecoveryData";
import {MysqlError, PoolConnection} from "mysql";

type TFindRecoveryData = {
    userId: number,
    value?: never
} | {
    userId?: never,
    value: string
};

class RecoveryActions {
    normalized({id, user_id, value, is_used, created_at}: IRecoveryDataDB): IRecoveryData {
        return {
            id,
            userId: user_id,
            value,
            isUsed: is_used,
            createdAt: created_at
        }
    }
    async findOne({userId, value}: TFindRecoveryData): Promise<IRecoveryDataDB> {
        return new Promise<IRecoveryDataDB>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findCodeStringSql = `SELECT * FROM user_recovery_code WHERE `;
                if(userId) findCodeStringSql += `user_id = "${userId}"`;
                else if(value) findCodeStringSql += `value = "${value}"`;

                connection.query(findCodeStringSql, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result[0]);
                })
            })
        })
    }

    async create({userId, value, createdAt}: IRecoveryDataCreation) {
        const foundRecoveryCode = await this.findOne({userId});

        if(foundRecoveryCode) {
            return new Promise((resolve, reject) => {
                dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                    const updateRecoveryCodeStringSQL = `UPDATE user_recovery_code SET is_used = 0, value = ?, created_at = ? WHERE user_id = ?`;
                    const updateRecoveryCodeQuerySQL = mysql.format(updateRecoveryCodeStringSQL, [value, createdAt, userId])
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
            const createRecoveryCodeQuerySQL = mysql.format(createRecoveryCodeStringSQL, [userId, value, createdAt]);
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
}

export default new RecoveryActions();