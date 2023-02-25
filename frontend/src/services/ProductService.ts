import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {
    IProductResponse,
    IProductsFetchingResponse
} from "../models/response/ProductResponse";
import {IProduct, IProductCreation} from "../models/IProduct";


class ProductService {
    private static base = "/product";
    static async fetch(): Promise<AxiosResponse<IProductsFetchingResponse>> {
        return $api.get<IProductsFetchingResponse>(this.base);
    }
    static async create(product: IProductCreation): Promise<AxiosResponse<IProductResponse>> {
        return $api.post<IProductResponse>(this.base, product);
    }
    static async delete(id: IProduct["id"]) {
        return $api.delete(this.base + `/${id}`);
    }
    static async fetchById(id: IProduct["id"]): Promise<AxiosResponse<IProductResponse>> {
        return $api.get<IProductResponse>(this.base + `/${id}`);
    }
}

export default ProductService;