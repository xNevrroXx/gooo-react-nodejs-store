import {MysqlError, PoolConnection} from "mysql";
import {ICategory, ICategoryCreation, ICategoryDB} from "../models/ICategory";

import mysql from "mysql";
const dbPool = require("./index");

type TArgumentFindCategory = {
    id: number,
    name?: never
} | {
    id?: never,
    name: string
}

class CategoryActions {
    normalization({name, label, id, created_at, parent_id}: ICategoryDB): ICategory {
        return {
            name,
            label,
            id,
            createdAt: created_at,
            parentId: parent_id
        }
    }
    async create ({name, parentId, createdAt, label}: ICategoryCreation) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const createSQLString = "INSERT INTO product_category (name, parent_id, created_at, label) VALUES (?, ?, ?, ?)";
                const createSQLQuery = mysql.format(createSQLString, [name, parentId, createdAt, label]);

                connection.query(createSQLQuery, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }
    async find ({id, name}: TArgumentFindCategory): Promise<ICategoryDB> {
        return new Promise<ICategoryDB>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findSQLString = "SELECT * FROM product_category WHERE ";
                if(id) {
                    findSQLString += `id = "${id}"`;
                }
                else if(name) {
                    findSQLString += `name = "${name}"`;
                }
 
                connection.query(findSQLString, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result[0]);
                })
            })
        })
    }

    async findAll (): Promise<ICategoryDB[]> {
        return new Promise<ICategoryDB[]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const findSQLString = "SELECT * FROM product_category";

                connection.query(findSQLString, (error, result) => {
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

export default new CategoryActions();