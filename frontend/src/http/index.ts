import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
    withCredentials: true, // todo find out why i'm getting the error if it has "true"
    baseURL: API_URL
})

$api.interceptors.request.use(function(config: AxiosRequestConfig) {
    config.headers
        ? (config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`)
        : (config.headers = { Authorization: `Bearer ${localStorage.getItem("token")}` });

    return config;
})

$api.interceptors.response.use(function(config: AxiosResponse) {
    const accessToken = config.data.accessToken;
    localStorage.setItem("token", accessToken);

    return config;
})

export default $api;