import dbPool from "./index";
// types
import mysql, {MysqlError, PoolConnection} from "mysql";
import {IUser} from "../models/IUser";
import {IShoppingCart, IShoppingCartDB} from "../models/IShoppingCart";
import {IProduct} from "../models/IProduct";

class ShoppingCartActions {
    normalization ({id, user_id, product_id, created_at}: IShoppingCartDB): IShoppingCart {
        return {
            id,
            userId: user_id,
            productId: product_id,
            createdAt: created_at
        }
    }
    async getProductsFromCart (userId: IUser["id"]): Promise<IShoppingCartDB[]> {
        return new Promise<IShoppingCartDB[]>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const getProductFromCartStringSQL = `SELECT * FROM shopping_cart WHERE user_id = ${userId}`;

                connection.query(getProductFromCartStringSQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }

    async addProductToCart(userId: IUser["id"], productId: IProduct["id"], timestamp: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const addProductToCartStringSQL = `INSERT INTO shopping_cart (user_id, product_id, created_at) VALUES (?, ?, ?)`;
                const addProductToCartQuerySQL = mysql.format(addProductToCartStringSQL, [userId, productId, timestamp]);

                connection.query(addProductToCartQuerySQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }

    async deleteProductFromCart(userId: IUser["id"], productId: IProduct["id"]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const deleteProductToCartStringSQL = `DELETE FROM shopping_cart WHERE user_id = ? AND product_id = ?`;
                const deleteProductToCartQuerySQL = mysql.format(deleteProductToCartStringSQL, [userId, productId]);

                connection.query(deleteProductToCartQuerySQL, (error, result) => {
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

export default new ShoppingCartActions;