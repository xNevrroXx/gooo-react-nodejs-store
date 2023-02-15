import {IProduct} from "../IProduct";

export interface IProductFetchingResponse {
    products: IProduct[]
}

export interface IProductCreationResponse {
    product: IProduct
}