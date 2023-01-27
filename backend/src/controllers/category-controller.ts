import {NextFunction, Request, Response} from "express";
import {ICategoryRequest} from "../models/ICategory";

import categoryService from "../service/category-service";

class CategoryController {
    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const categories = await categoryService.getAll();

            response.status(200).json({
                message: "success",
                categories: categories
            })
        }
        catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {name, parentId, label}: ICategoryRequest = request.body;
            await categoryService.create({name, parentId, label});

            response.status(200).json({
                message: "success"
            })
        }
        catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();