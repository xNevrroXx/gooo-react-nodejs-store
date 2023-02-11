import $api, {API_URL} from "../http";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {IUserRegistration} from "../models/IUser";

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
}

export default AuthService;