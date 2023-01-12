import mysql, {MysqlError, PoolConnection} from "mysql";

const dbPool = require("./index");

class UserActions {
    async findUser (email: string) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findUserQuerySQL = mysql.format("SELECT * FROM user WHERE email = ?", [email]);

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

    async createUser({email, password, username, firstname, lastname, timestamp, activationLink}: {[fieldName: string]: string}) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findUserQuerySQL = mysql.format("INSERT INTO user (username, email, password, firstname, lastname, activation_link, created_at) VALUES(?, ?, ?, ?, ?, ?, ?)", [username, email, password, firstname, lastname, activationLink, timestamp]);

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