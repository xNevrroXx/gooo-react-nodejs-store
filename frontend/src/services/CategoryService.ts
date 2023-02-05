import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {ICategory, ICategoryCreation} from "../models/ICategory";
import {ICategoryResponse} from "../models/response/CategoryResponse";


class CategoryService {
    private static base = "/category";
    static async fetch(): Promise<AxiosResponse<ICategoryResponse>> {
        return $api.get<ICategoryResponse>(this.base);
    }
    static async create(category: ICategoryCreation) {
        return $api.post(this.base, category);
    }
    static async delete(id: ICategory["id"]) {
        return $api.delete(this.base + `/${id}`);
    }
}

export default CategoryService;