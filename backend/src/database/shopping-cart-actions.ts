import dbPool from "./index";
// types
import mysql, {MysqlError, PoolConnection} from "mysql";
import {IUser} from "../models/IUser";
import {IShoppingCart, IShoppingCartDB} from "../models/IShoppingCart";
import {IProduct, IProductInCart} from "../models/IProduct";
import ApiError from "../exceptions/api-error";

class ShoppingCartActions {
    normalization ({id, user_id, product_id, created_at, quantity, is_selected}: IShoppingCartDB): IShoppingCart {
        return {
            id,
            userId: user_id,
            productId: product_id,
            createdAt: created_at,
            isSelected: !!is_selected,
            quantity
        }
    }
    async findOne (userId: IUser["id"], productId: IProduct["id"]): Promise<IShoppingCartDB> {
        return new Promise<IShoppingCartDB>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const findOneStringSQL = "SELECT * FROM shopping_cart WHERE user_id = ? AND product_id = ?";
                const findOneQuerySQL = mysql.format(findOneStringSQL, [userId, productId]);

                connection.query(findOneQuerySQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result[0]);
                })
            })
        })
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
        const foundProductInCart = await this.findOne(userId, productId);

        if (foundProductInCart) {
            return new Promise<void>((resolve, reject) => {
                dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                    const addProductToCartStringSQL = `UPDATE shopping_cart SET quantity = ? WHERE user_id = ? AND product_id = ?`;
                    const addProductToCartQuerySQL = mysql.format(addProductToCartStringSQL, [foundProductInCart.quantity + 1, userId, productId]);

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
        else {
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

    async changeSelect(userId: IUser["id"], productId: IProduct["id"], isSelected: IProductInCart["isSelected"]) {
        return new Promise<void>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const deleteProductFromCartStringSQL = `UPDATE shopping_cart SET is_selected = ? WHERE user_id = ? AND product_id = ?`;
                const deleteProductFromCartQuerySQL = mysql.format(deleteProductFromCartStringSQL, [isSelected ? 1 : 0, userId, productId]);

                connection.query(deleteProductFromCartQuerySQL, (error, result) => {
                    connection.release();

                    if(error) {
                        reject(error);
                    }

                    resolve(result);
                })
            })
        })
    }

    async reduceQuantity(userId: IUser["id"], productId: IProduct["id"]) {
        const foundProductInCart = await this.findOne(userId, productId);

        if (foundProductInCart.quantity === 1) {
            throw ApiError.BadRequest("Невозможно уменьшить количество. Возможно только удалить товар из корзины.")
        }
        return new Promise<void>((resolve, reject) => {
            dbPool.getConnection(async (error: MysqlError, connection: PoolConnection) => {
                const reduceQuantityStringSQL = `UPDATE shopping_cart SET quantity = ? WHERE user_id = ? AND product_id = ?`;
                const reduceQuantityQuerySQL = mysql.format(reduceQuantityStringSQL, [foundProductInCart.quantity - 1, userId, productId]);

                connection.query(reduceQuantityQuerySQL, (error, result) => {
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