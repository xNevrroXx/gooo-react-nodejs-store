import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {IProductResponse} from "../models/response/ProductResponse";
import {IProductCreation} from "../models/IProduct";


class ProductService {
    private static base = "/product";
    static async fetchProducts(): Promise<AxiosResponse<IProductResponse>> {
        return $api.get<IProductResponse>(this.base);
    }
    static async createProduct(product: IProductCreation) {
        return $api.post(this.base + "/create", product);
    }
}

export default ProductService;