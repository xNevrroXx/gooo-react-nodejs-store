import {AxiosResponse} from "axios";
// own modules
import $api from "../http";
// types
import {IProduct, IProductInCart} from "../models/IProduct";
import {IProductResponse} from "../models/response/ProductResponse";
import {IShoppingCartResponse} from "../models/response/ShoppingCartResponse";

class ShoppingCart {
    private static base = "/user/shopping-cart";

    static async addProductToShoppingCart(productId: IProduct["id"]): Promise<AxiosResponse<IProductResponse>> {
        return $api.post(this.base + `/${productId}`);
    }

    static async deleteProductFromShoppingCart(productId: IProduct["id"]): Promise<AxiosResponse<void>> {
        return $api.delete(this.base + `/${productId}`);
    }

    static async fetchShoppingCart(): Promise<AxiosResponse<IShoppingCartResponse>> {
        return $api.get<IShoppingCartResponse>(this.base);
    }

    static async changeSelect(productId: IProduct["id"], isSelected: IProductInCart["isSelected"]): Promise<AxiosResponse<void>> {
        return $api.post<void>(this.base + `/change-select/${productId}`, {isSelected});
    }

    static async reduceQuantity(productId: IProduct["id"]): Promise<AxiosResponse<void>> {
        return $api.post<void>(this.base + `/reduce-quantity/${productId}`);
    }
}

export default ShoppingCart;