import $api from "../http";
// types
import {AxiosResponse} from "axios";
import {ICategory, ICategoryCreation} from "../models/ICategory";
import {ICategoryFetchingResponse} from "../models/response/CategoryResponse";


class CategoryService {
    private static base = "/category";
    static async fetch(): Promise<AxiosResponse<ICategoryFetchingResponse>> {
        return $api.get<ICategoryFetchingResponse>(this.base);
    }
    static async create(category: ICategoryCreation): Promise<AxiosResponse<ICategoryFetchingResponse>>  {
        return $api.post<ICategoryFetchingResponse>(this.base, category);
    }
    static async delete(id: ICategory["id"]) {
        return $api.delete(this.base + `/${id}`);
    }
}

export default CategoryService;