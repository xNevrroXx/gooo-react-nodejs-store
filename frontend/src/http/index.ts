// third-party modules
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
// own modules
import AuthService from "../services/AuthService";

interface AxiosRequestConfigExtra extends AxiosRequestConfig {
    _isRetry: boolean
}
const isAxiosRequestConfigExtra = (config: AxiosRequestConfig): config is AxiosRequestConfigExtra => {
    return true;
}


export const API_URL = import.meta.env.VITE_BACKEND;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(function(config: InternalAxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
}, function(error) {
    return Promise.reject(error);
})

$api.interceptors.response.use(function(config: AxiosResponse) {
    return config;
}, async function(error: AxiosError) {
    if(axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
            if (error.config && isAxiosRequestConfigExtra(error.config) && !error.config._isRetry) {
                error.config._isRetry = true;
                const originalRequest = error.config;
                try {
                    const response = await AuthService.refreshToken();
                    localStorage.setItem("token", response.data.accessToken);
                    return $api.request(originalRequest);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            }
        }
    }
    return Promise.reject(error);
})

export default $api;