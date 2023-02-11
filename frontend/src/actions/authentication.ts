import axios from "axios";
// own modules
import AuthService from "../services/AuthService";
import {createTimeoutNotificationThunk} from "./notifications";
import {ROUTE, router} from "../router";
import {createPath} from "../router/createPath";
// types
import {IUser, IUserDto, IUserLogin, IUserRegistration} from "../models/IUser";
import {AppDispatch} from "../store";


export const recoveryPasswordGetLinkThunk = ({email}: {email: IUser["email"]}) => async (dispatch: AppDispatch) => {
    try {
        await AuthService.recoveryPasswordGetLink(email);
        dispatch(createTimeoutNotificationThunk({type: "success", title: "Успешно", description: "Ссылка для восстановления была отправлена на ваш почтовый адрес"}));
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
export const recoveryPasswordChangePasswordThunk = ({code, password}: {code: string, password: IUser["password"]}) => async (dispatch: AppDispatch) => {
    try {
        await AuthService.recoveryPasswordSetNew(code, password);
        dispatch(createTimeoutNotificationThunk({type: "success", title: "Успешно", description: "Пароль успешно изменен"}));
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
export const loginThunk = ({email, password}: IUserLogin) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.login(email, password);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.user));
        dispatch(createTimeoutNotificationThunk({type: "success", title: "Привет!", description: "Вы успешно вошли в аккаунт"}))
        router.navigate(createPath({path: ROUTE.MAIN}));
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
export const registrationThunk = (user: IUserRegistration) => async (dispatch: AppDispatch) => {
    try {
        const response = await AuthService.registration(user);
        localStorage.setItem("token", response.data.accessToken);
        dispatch(setAuthentication(true));
        dispatch(setUser(response.data.user));
        dispatch(createTimeoutNotificationThunk({type: "success", title: "Регистрация прошла успешно", description: "Ссылка для активации аккаунта была отправлена на ваш почтовый адрес"}, 5000))
        router.navigate(createPath({path: ROUTE.MAIN}));
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
        dispatch(createTimeoutNotificationThunk({type: "success", title: "Вы успешно вышли из учетной записи"}))
        router.navigate(createPath({path: ROUTE.USER_LOGIN}));
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
        router.navigate(createPath({path: ROUTE.MAIN}))
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
export const setUser = (value: IUserDto | null) => {
    return {type: "SET_USER", payload: value};
}
export const setAuthentication = (value: boolean) => {
    return {type: "SET_AUTHENTICATION", payload: value};
}