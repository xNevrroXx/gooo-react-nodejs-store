import mysql from "mysql";
// own modules
import dbPool from "./index";
// types
import {MysqlError, PoolConnection} from "mysql";
import {IActivationData, IActivationDataCreation, IActivationDataDB} from "../models/IActivationData";

type TFindActivationData = {
    userId: number
    activationLink?: never
} | {
    userId?: never
    activationLink: string
}

class ActivationActions {
    normalization({id, user_id, is_activated, activation_link, created_at}: IActivationDataDB): IActivationData {
        return <IActivationData>{
            id,
            userId: user_id,
            isActivated: is_activated,
            activationLink: activation_link,
            createdAt: created_at
        }
    }

    async findActivationData ({userId, activationLink}: TFindActivationData): Promise<IActivationDataDB> {
        return new Promise<IActivationDataDB>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                let findUserStringSQL = "SELECT * FROM user_activation WHERE ";

                if (userId) findUserStringSQL += `user_id = "${userId}"`;
                else if (activationLink) findUserStringSQL += `activation_link = "${activationLink}"`;

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
    async createActivationData({userId, activationLink, createdAt}: IActivationDataCreation) {
        const foundActivationData = await this.findActivationData({userId});
        if(foundActivationData) {
            return new Promise((resolve, reject) => {
                dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                    const createActivationDataStringSQL = "UPDATE user_activation SET activation_link = ? WHERE user_id = ?";
                    const createActivationDataQuerySQL = mysql.format(createActivationDataStringSQL, [activationLink, userId]);

                    connection.query(createActivationDataQuerySQL, (error, result) => {
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
            return new Promise((resolve, reject) => {
                dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                    const createActivationDataStringSQL = "INSERT INTO user_activation (user_id, activation_link, created_at) VALUES (?, ?, ?)";
                    const createActivationDataQuerySQL = mysql.format(createActivationDataStringSQL, [userId, activationLink, createdAt]);

                    connection.query(createActivationDataQuerySQL, (error, result) => {
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

    async activateUser(userId: number) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const createActivationDataStringSQL = "UPDATE user_activation SET is_activated = 1 WHERE user_id = ?";
                const createActivationDataQuerySQL = mysql.format(createActivationDataStringSQL, [userId]);

                connection.query(createActivationDataQuerySQL, (error, result) => {
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

export default new ActivationActions();