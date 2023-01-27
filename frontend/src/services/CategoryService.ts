import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {ICategoryCreation} from "../models/ICategory";
import {ICategoryResponse} from "../models/response/CategoryResponse";


class CategoryService {
    private static base = "/category";
    static async fetchCategories(): Promise<AxiosResponse<ICategoryResponse>> {
        return $api.get<ICategoryResponse>(this.base);
    }
    static async createCategory(category: ICategoryCreation) {
        return $api.post(this.base + "/create", category);
    }
}

export default CategoryService;