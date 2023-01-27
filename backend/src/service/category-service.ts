import {ICategoryDB, ICategoryRequest} from "../models/ICategory";

const ApiError = require("../exceptions/api-error");
const categoryActions = require("../database/category-actions");
 
class CategoryService {
    async getAll() {
        const categories = await categoryActions.findAll() as ICategoryDB[] // todo understand why generic return type don't work properly;
        const normalizedCategories = categories.map(item => categoryActions.normalization(item));
        return normalizedCategories;
    }
    async create({name, parentId, label}: ICategoryRequest) {
        if(parentId !== 0) {
            const parentCategory = await categoryActions.find({id: parentId}) as ICategoryDB;
            if(!parentCategory) {
                throw ApiError.Conflict("Поле parentId содержит недопустимое значение/несуществующую родительскую категорию.");
            }
        }
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        await categoryActions.create({name, parentId, createdAt: timestamp, label});
    }
}

module.exports = new CategoryService();