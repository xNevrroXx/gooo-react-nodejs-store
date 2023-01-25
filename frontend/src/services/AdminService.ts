// own modules
import $api from "../http";
// types
import {IProduct} from "../models/IProduct";

class AdminService {
    static async createProduct(product: IProduct) {
        return $api.post("/product/create", product);
    }
}

export default AdminService;