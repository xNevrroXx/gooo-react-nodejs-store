import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

// own modules
import store from "../store/index";
import {createTimeoutNotification} from "../actions/notifications";

export const API_URL = "http://localhost:5000/api";
const {dispatch} = store;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(function(config: AxiosRequestConfig) {
    config.headers
        ? (config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`)
        : (config.headers = { Authorization: `Bearer ${localStorage.getItem("token")}` });

    return config;
}, function(error) {
    if(error.request) {
        dispatch(createTimeoutNotification({type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}))
    }
    return Promise.reject(error);
})

$api.interceptors.response.use(function(config: AxiosResponse) {
    const accessToken = config.data.accessToken;
    localStorage.setItem("token", accessToken);

    return config;
}, function(error: AxiosError) {
    if(axios.isAxiosError(error) && error.response) {
        if (error.response.data.message) {
            dispatch(createTimeoutNotification({type: "error", title: `Ошибка ${error.response.status}`, description: error.response.data.message}))
        }
        else if(error.response.status) {
            dispatch(createTimeoutNotification({type: "error", title: `Ошибка ${error.response.status}`, description: error.response.statusText}))
        }
    }
    else {
        dispatch(createTimeoutNotification({type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}))
        throw error;
    }
    return Promise.reject(error);
})

export default $api;