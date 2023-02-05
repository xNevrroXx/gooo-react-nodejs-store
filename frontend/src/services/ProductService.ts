import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {IProductResponse} from "../models/response/ProductResponse";
import {IProduct, IProductCreation} from "../models/IProduct";


class ProductService {
    private static base = "/product";
    static async fetch(): Promise<AxiosResponse<IProductResponse>> {
        return $api.get<IProductResponse>(this.base);
    }
    static async create(product: IProductCreation) {
        return $api.post(this.base, product);
    }
    static async delete(id: IProduct["id"]) {
        return $api.delete(this.base + `/${id}`);
    }
}

export default ProductService;