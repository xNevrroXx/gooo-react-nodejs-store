import {NextFunction, Request, Response} from "express";
import {ICategoryRequest} from "../models/ICategory";

import categoryService from "../service/category-service";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error";

class CategoryController {
    async getAll(request: Request, response: Response, next: NextFunction) {
        try {
            const categoryTree = await categoryService.getAll();

            response.status(200).json({
                message: "success",
                categories: categoryTree
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