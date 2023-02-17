import {MysqlError, PoolConnection} from "mysql";
import {IProductImages, IProduct, IProductCreation, IProductDB, IProductWithImagesDB} from "../models/IProduct";

import mysql from "mysql";
import dbPool from "./index";

type TArgumentFindProduct = {
    id: number,
    name?: never
} | {
    id?: never,
    name: string
}

class ProductActions {
    normalization({id, name, price, weight, weight_units, short_description, long_description, category_id, stock, created_at, images}: IProductWithImagesDB): IProduct {
        const imageLinks = images.map(imageObj => imageObj.link);

        return {
            id,
            name,
            price,
            weight,
            weightUnits: weight_units,
            shortDescription: short_description,
            longDescription: long_description,
            categoryId: category_id,
            stock,
            createdAt: created_at,
            images: imageLinks
        }
    }
    async create ({name, price, weight, weightUnits, shortDescription, longDescription, stock, categoryId, createdAt}: IProductCreation): Promise<IProduct["id"]> {
        return new Promise<IProduct["id"]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const createSQLString = "INSERT INTO product (name, price, weight, weight_units, short_description, long_description, stock, category_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const createSQLQuery = mysql.format(createSQLString, [name, price, weight, weightUnits, shortDescription, longDescription, stock, categoryId, createdAt]);

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
    async createProductImage (id: IProduct["id"], image: IProductCreation["images"][0]) {
        return new Promise<void>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const createSQLString = "INSERT INTO product_image (product_id, link) VALUES (?, ?)";
                const createSQLQuery = mysql.format(createSQLString, [id, image]);

                connection.query(createSQLQuery, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve();
                })
            })
        })
    }
    async find ({id, name}: TArgumentFindProduct): Promise<IProductDB> {
        return new Promise<IProductDB>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findSQLString = "SELECT * FROM product WHERE ";
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
    async findImagesProduct(id: IProduct["id"]): Promise<IProductImages[]> {
        return new Promise<IProductImages[]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                let findImagesSQLString = `SELECT * FROM product_image WHERE product_id = ${id}`;

                connection.query(findImagesSQLString, (error, result) => {
                    connection.release();
                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }

    async findAll(): Promise<IProductDB[]> {
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
    async findImagesAllProducts(): Promise<IProductImages[]> {
        return new Promise<IProductImages[]>((resolve, reject) => {
            dbPool.getConnection((error: MysqlError, connection: PoolConnection) => {
                const findSQLString = "SELECT * FROM product_image";

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