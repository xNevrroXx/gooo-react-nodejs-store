import {ICategoryDB, ICategoryRequest} from "../models/ICategory";

import ApiError from "../exceptions/api-error";
import categoryActions from "../database/category-actions";
 
class CategoryService {
    async getAll() {
        const categories = await categoryActions.findAll();
        const normalizedCategories = categories.map(item => categoryActions.normalization(item));
        const categoryTree = categoryActions.createTree(normalizedCategories);

        return categoryTree;
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

export default new CategoryService();