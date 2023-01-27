import {NextFunction, Request, Response} from "express";
import {IProductRequest} from "../models/IProduct";

const productService = require("../service/product-service");

class productController {
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
            const product: IProductRequest = request.body;
            await productService.create(product);

            response.status(200).json({
                message: "success"
            })
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new productController();