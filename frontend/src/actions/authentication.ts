import axios from "axios";
// own modules
import AuthService from "../services/AuthService";
import {createTimeoutNotificationThunk} from "./notifications";
// types
import {IUser} from "../models/IUser";
import {AppDispatch} from "../store";

export const loginThunk = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.user));
    } catch (error) {
        if (!axios.isAxiosError(error)) { // axios error handler is in the interceptor
            if(error instanceof Error) {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: error.message}))
            }
            else {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}))
            }
        }
    }
}
export const registrationThunk = (email: string, password: string, username: string, firstname: string, lastname: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(email, password, username, firstname, lastname);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.user));
    } catch (error) {
        if (!axios.isAxiosError(error)) { // axios error handler is in the interceptor
            if(error instanceof Error) {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: error.message}))
            }
            else {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}))
            }
        }
    }
}
export const logoutThunk = () => async (dispatch: AppDispatch) => {
    try {
        await AuthService.logout();
        localStorage.removeItem("token");
        dispatch(setAuthentication(false));
        dispatch(setUser(null));
    }
    catch (error) {
        if (!axios.isAxiosError(error)) { // axios error handler is in the interceptor
            if(error instanceof Error) {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: error.message}))
            }
            else {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}))
            }
        }
    }
}
export const checkAuthenticationThunk = () => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.refreshToken();
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.user));
    }
    catch (error) {
        if (!axios.isAxiosError(error)) { // axios error handler is in the interceptor
            if(error instanceof Error) {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: error.message}))
            }
            else {
                dispatch(createTimeoutNotificationThunk({type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}))
            }
        }
    }
}
export const setUser = (value: IUser | null) => {
    return {type: "SET_USER", payload: value};
}
export const setAuthentication = (value: boolean) => {
    return {type: "SET_AUTHENTICATION", payload: value};
}