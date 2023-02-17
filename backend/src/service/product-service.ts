import ApiError from "../exceptions/api-error";
import categoryActions from "../database/category-actions";
import productActions from "../database/product-actions";
// types
import {IProduct, IProductRequest, IProductWithImagesDB} from "../models/IProduct";
import product from "../router/product/product";

class ProductService {
    async getById(id: IProduct["id"]): Promise<IProduct> {
        const product = await productActions.find({id});
        const productImages = await productActions.findImagesProduct(id);
        const normalizedProduct = productActions.normalization({...product, images: productImages});
        return normalizedProduct;
    }
    async getAll() {
        const products = await productActions.findAll();
        const productsImages = await productActions.findImagesAllProducts();
        const productsWithImagesDB: IProductWithImagesDB[] = products.map<IProductWithImagesDB>(product => {
            const productImages = productsImages.filter(imageObj => imageObj.product_id === product.id);
            return {
                ...product,
                images: productImages
            }
        })
        const normalizedProducts = productsWithImagesDB.map(item => productActions.normalization(item));
        return normalizedProducts;
    }
    async create(product: IProductRequest): Promise<IProduct> {
        if(product.categoryId !== 0) {
            const parentCategory = await categoryActions.find({id: product.categoryId});
            if(!parentCategory) {
                throw ApiError.Conflict("Поле categoryId содержит недопустимое значение/несуществующую родительскую категорию.");
            }
        }
        else if(product.categoryId === 0) {
            throw ApiError.Conflict("Для продукта не может быть назначена категория с Id равным 0. Должна быть выбрана дочерняя категории без потомков.")
        }
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        const id = await productActions.create({...product, createdAt: timestamp});
        for (const image of product.images) {
            await productActions.createProductImage(id, image);
        }

        return {
            ...product,
            id,
            createdAt: timestamp
        }
    }
}

export default new ProductService();