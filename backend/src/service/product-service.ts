import {IProduct, IProductDB, IProductRequest} from "../models/IProduct";

import ApiError from "../exceptions/api-error";
import categoryActions from "../database/category-actions";
import productActions from "../database/product-actions";

class ProductService {
    async getAll() {
        const products = await productActions.findAll();
        const normalizedProducts = products.map(item => productActions.normalization(item));
        return normalizedProducts;
    }
    async create(product: IProductRequest): Promise<IProduct> {
        if(product.categoryId !== 0) {
            const parentCategory = await categoryActions.find({id: product.categoryId});
            if(!parentCategory) {
                throw ApiError.Conflict("Поле categoryId содержит недопустимое значение/несуществующую родительскую категорию.");
            }
        }
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        const id = await productActions.create({...product, createdAt: timestamp});
        return {
            ...product,
            id,
            createdAt: timestamp
        }
    }
}

export default new ProductService();