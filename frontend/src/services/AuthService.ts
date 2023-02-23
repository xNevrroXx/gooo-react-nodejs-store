import axios, {AxiosResponse} from "axios";
// own modules
import $api, {API_URL} from "../http";
// types
import {AuthResponse} from "../models/response/AuthResponse";
import {IUserRegistration} from "../models/IUser";
import {IProduct} from "../models/IProduct";
import {IProductFetchingResponse} from "../models/response/ProductResponse";

class AuthService {
    private static base = "/user";
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>(this.base + "/login", {email, password});
    }

    static async registration(user: IUserRegistration): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(this.base + "/registration", user);
    }

    static async logout(): Promise<AxiosResponse<null>> {
        return $api.post<null>(this.base + "/logout");
    }

    static async recoveryPasswordGetLink(email: string): Promise<AxiosResponse<null>> {
        return $api.post<null>(this.base + "/recovery/get-link", {email});
    }

    static async recoveryPasswordSetNew(code: string, password: string): Promise<void> {
        return $api.post(this.base + `/recovery/${code}`, {password});
    }

    static async refreshToken(): Promise<AxiosResponse<AuthResponse>> {
        return axios.get<AuthResponse>(`${API_URL}/user/refresh`, {withCredentials: true});
    }

    static async addProductToShoppingCart(productId: IProduct["id"]): Promise<AxiosResponse<void>> {
        return $api.post(this.base + `/shopping-cart/${productId}`);
    }

    static async deleteProductFromShoppingCart(productId: IProduct["id"]): Promise<AxiosResponse<void>> {
        return $api.delete(this.base + `/shopping-cart/${productId}`);
    }

    static async getProductsFromShoppingCart(): Promise<AxiosResponse<IProductFetchingResponse>> {
        return $api.get<IProductFetchingResponse>(this.base + `/shopping-cart}`);
    }
}

export default AuthService;