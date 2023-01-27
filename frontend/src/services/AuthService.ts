import $api, {API_URL} from "../http";
import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

class AuthService {
    private static base = "/user";
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>(this.base + "/login", {email, password});
    }

    static async registration(email: string, password: string, username: string, firstname: string, lastname: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(this.base + "/registration", {email, password, username, firstname, lastname});
    }

    static async logout(): Promise<AxiosResponse<null>> {
        return $api.post<null>(this.base + "/logout");
    }

    static async recoveryPasswordGetLink(email: string): Promise<AxiosResponse<null>> {
        return $api.post<null>(this.base + "/recovery/get-link", {email});
    }

    static async recoveryPasswordSetNewPassword(code: string, password: string): Promise<void> {
        return $api.post(this.base + `/recovery/${code}`, {password});
    }

    static async refreshToken(): Promise<AxiosResponse<AuthResponse>> {
        return axios.get<AuthResponse>(this.base + `${API_URL}/refresh`, {withCredentials: true});
    }
}

export default AuthService;