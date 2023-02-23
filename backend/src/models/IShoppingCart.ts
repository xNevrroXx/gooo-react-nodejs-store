import {IUser} from "./IUser";
import {IProduct} from "./IProduct";

export interface IShoppingCartDB {
    id: number,
    user_id: IUser["id"],
    product_id: IProduct["id"],
    created_at: string
}

export interface IShoppingCart {
    id: number,
    userId: IUser["id"],
    productId: IProduct["id"],
    createdAt: string
}