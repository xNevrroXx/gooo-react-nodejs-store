import {IUser} from "./IUser";
import {IProduct} from "./IProduct";

export interface IShoppingCartDB {
    id: number,
    user_id: IUser["id"],
    product_id: IProduct["id"],
    quantity: number,
    is_selected: 1 | 0,
    created_at: string
}

export interface IShoppingCart {
    id: number,
    userId: IUser["id"],
    productId: IProduct["id"],
    quantity: number,
    isSelected: boolean
    createdAt: string,
}