import mysql, {MysqlError, PoolConnection} from "mysql";

const dbPool = require("./index");

class UserActions {
    async findUser ({email = null, id = null}: {[field: string]: string | null}) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                let findUserStringSQL = "SELECT * FROM user WHERE ";

                if (email !== null) findUserStringSQL += `email = "${email}"`;
                else if (id !== null) findUserStringSQL += `id = "${id}"`;

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

    async findAllUsers () {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findUserStringSQL = "SELECT email FROM user";

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

    async createUser({email, password, username, firstname, lastname, timestamp}: {[fieldName: string]: string}) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findUserQuerySQL = mysql.format("INSERT INTO user (username, email, password, firstname, lastname, created_at) VALUES(?, ?, ?, ?, ?, ?)", [username, email, password, firstname, lastname, timestamp]);

                connection.query(findUserQuerySQL, (error, result) => {
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

module.exports = new UserActions();