import {MysqlError, PoolConnection} from "mysql";
import {IProduct, IProductCreation, IProductDB} from "../models/IProduct";

import mysql from "mysql";
import dbPool from "./index";

type TArgumentFindProduct = {
    id: number,
    name?: never
} | {
    id?: never,
    name?: string
}

class ProductActions {
    normalization({id, name, price, weight, weight_units, short_description, long_description, image, thumb, category_id, stock, created_at}: IProductDB): IProduct {
        return {
            id,
            name,
            price,
            weight,
            weightUnits: weight_units,
            shortDescription: short_description,
            longDescription: long_description,
            image,
            thumb,
            categoryId: category_id,
            stock,
            createdAt: created_at,
        }
    }
    async create ({name, price, weight, weightUnits, shortDescription, longDescription, image, thumb, stock, categoryId, createdAt}: IProductCreation): Promise<IProduct["id"]> {
        return new Promise<IProduct["id"]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const createSQLString = "INSERT INTO product (name, price, weight, weight_units, short_description, long_description, image, thumb, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const createSQLQuery = mysql.format(createSQLString, [name, price, weight, weightUnits, shortDescription, longDescription, image, thumb, stock, categoryId, createdAt]);

                connection.query(createSQLQuery, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result.insertId);
                })
            })
        })
    }
    async find ({id, name}: TArgumentFindProduct): Promise<IProductDB> {
        return new Promise<IProductDB>((resolve, reject) => {
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

    async findAll (): Promise<IProductDB[]> {
        return new Promise<IProductDB[]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const findSQLString = "SELECT * FROM product";

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

export default new ProductActions();