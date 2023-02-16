import {NextFunction, Request, Response} from "express";
import {IProductRequest} from "../models/IProduct";

import productService from "../service/product-service";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error";

class productController {
    async getById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const product = await productService.getById(+id);

            response.status(200).json({
                message: "success",
                product: product
            })
        }
        catch (error) {
            next(error);
        }
    }
    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const products = await productService.getAll();

            response.status(200).json({
                message: "success",
                products: products
            })
        }
        catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }

            const product: IProductRequest = request.body;
            const createdProduct = await productService.create(product);

            response.status(200).json({
                message: "success",
                product: createdProduct
            })
        }
        catch (error) {
            next(error);
        }
    }
}

export default new productController();