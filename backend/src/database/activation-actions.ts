import mysql, {MysqlError, PoolConnection} from "mysql";

const dbPool = require("./index");

class ActivationActions {
    async findActivationData ({userId = null, activationLink = null}: {userId: number | null, activationLink: string | null}): Promise<any[]> {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                let findUserStringSQL = "SELECT * FROM user_activation WHERE ";

                if (userId !== null) findUserStringSQL += `user_id = "${userId}"`;
                else if (activationLink !== null) findUserStringSQL += `activation_link = "${activationLink}"`;

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
    async createActivationData(userId: number, activationLink: string, timestamp: string) {
        const foundActivationData = await this.findActivationData({userId, activationLink: null});
        if(foundActivationData.length !== 0) {
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
                    const createActivationDataQuerySQL = mysql.format(createActivationDataStringSQL, [userId, activationLink, timestamp]);

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

module.exports = new ActivationActions();