import {IProductDB, IProductRequest} from "../models/IProduct";

import ApiError from "../exceptions/api-error";
import categoryActions from "../database/category-actions";
import productActions from "../database/product-actions";

class ProductService {
    async getAll() {
        const products = await productActions.findAll() as IProductDB[] // todo understand why generic return type don't work properly;
        const normalizedProducts = products.map(item => productActions.normalization(item));
        return normalizedProducts;
    }
    async create(product: IProductRequest) {
        if(product.categoryId !== 0) {
            const parentCategory = await categoryActions.find({id: product.categoryId});
            if(!parentCategory) {
                throw ApiError.Conflict("Поле categoryId содержит недопустимое значение/несуществующую родительскую категорию.");
            }
        }
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        await productActions.create({...product, createdAt: timestamp});
    }
}

export default new ProductService();