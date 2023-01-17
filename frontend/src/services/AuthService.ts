import $api from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/login", {email, password})
    }

    static async registration(email: string, password: string, username: string, firstname: string, lastname: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/registration", {email, password, username, firstname, lastname});
    }

    static async logout(): Promise<void> {
        return $api.post("/logout")
    }

    static async recoveryPasswordGetLink(email: string): Promise<void> {
        return $api.post("/recovery/get-link", {email})
    }

    static async recoveryPasswordSetNewPassword(code: string, password: string): Promise<void> {
        return $api.post(`/recovery/${code}`, {password})
    }

    static async refreshToken(): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>("/refresh");
    }
}

export default AuthService;