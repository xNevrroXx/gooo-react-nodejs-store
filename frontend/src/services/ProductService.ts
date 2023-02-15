import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {IProductCreationResponse, IProductFetchingResponse} from "../models/response/ProductResponse";
import {IProduct, IProductCreation} from "../models/IProduct";


class ProductService {
    private static base = "/product";
    static async fetch(): Promise<AxiosResponse<IProductFetchingResponse>> {
        return $api.get<IProductFetchingResponse>(this.base);
    }
    static async create(product: IProductCreation): Promise<AxiosResponse<IProductCreationResponse>> {
        return $api.post<IProductCreationResponse>(this.base, product);
    }
    static async delete(id: IProduct["id"]) {
        return $api.delete(this.base + `/${id}`);
    }
}

export default ProductService;