import {MysqlError, PoolConnection} from "mysql";
import {ICategory, ICategoryCreation, ICategoryDB} from "../models/ICategory";
import {IProduct, IProductCreation, IProductDB} from "../models/IProduct";

const mysql = require("mysql");
const dbPool = require("./index");

type TArgumentFindProduct = {
    id: number,
    name?: never
} | {
    id?: never,
    name?: string
}

class ProductActions {
    normalization({id, name, price, weight, weight_units, short_description, long_description, image, thumb, category_id, location, stock, created_at}: IProductDB): IProduct {
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
            location,
            stock,
            createdAt: created_at,
        }
    }
    async create ({name, price, weight, weightUnits, shortDescription, longDescription, image, thumb, location, stock, categoryId, createdAt}: IProductCreation) {
        return new Promise((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const createSQLString = "INSERT INTO product (name, price, weight, weight_units, short_description, long_description, image, thumb, location, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const createSQLQuery = mysql.format(createSQLString, [name, price, weight, weightUnits, shortDescription, longDescription, image, thumb, location, stock, categoryId, createdAt]);

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
    async find (arg: TArgumentFindProduct): Promise<IProductDB> {
        return new Promise<IProductDB>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findSQLString = "SELECT * FROM product_category WHERE ";
                if(arg.id) {
                    findSQLString += `id = "${arg.id}"`;
                }
                else if(arg.name) {
                    findSQLString += `name = "${arg.name}"`;
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

module.exports = new ProductActions();