// third-party modules
import {createAsyncThunk} from "@reduxjs/toolkit";
// own modules
import AuthService from "../../services/AuthService";
import {ROUTE, router} from "../../router";
import {createPath} from "../../router/createPath";
// actions
import {createTimeoutErrorNotification, createTimeoutNotification} from "./notifications";
// types
import {IUser, IUserLogin, IUserRegistration} from "../../models/IUser";

export const recoveryPasswordGetLink = createAsyncThunk(
    "authentication/recoveryPasswordGetLink",
    async ({email}: {email: IUser["email"]}, thunkApi) => {
        try {
            await AuthService.recoveryPasswordGetLink(email);
            thunkApi.dispatch(createTimeoutNotification({notification: {type: "success", title: "Успешно", description: "Ссылка для восстановления была отправлена на ваш почтовый адрес"}}) );
            return;
        }
        catch (error) {
            thunkApi.dispatch(createTimeoutErrorNotification(error));
            return thunkApi.rejectWithValue(error);
        }
    }
)
export const recoveryPasswordChangePassword = createAsyncThunk(
    "authentication/recoveryPasswordChangePassword",
    async ({code, password}: {code: string, password: IUser["password"]}, thunkApi) => {
        try {
            await AuthService.recoveryPasswordSetNew(code, password);
            thunkApi.dispatch(createTimeoutNotification({notification: {type: "success", title: "Успешно", description: "Пароль успешно изменен"}}));
            return;
        }
        catch (error) {
            thunkApi.dispatch(createTimeoutErrorNotification(error));
            return thunkApi.rejectWithValue(error);
        }
    }
)
export const login = createAsyncThunk(
    "authentication/login",
    async ({email, password}: IUserLogin, thunkApi) => {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accessToken);
            router.navigate(createPath({path: ROUTE.MAIN}));
            thunkApi.dispatch(createTimeoutNotification({notification: {type: "success", title: "Вход выполнен успешно"}}) )
            return response.data;
        }
        catch (error) {
            thunkApi.dispatch(createTimeoutErrorNotification(error));
            return thunkApi.rejectWithValue(error);
        }
    }
)
export const registration = createAsyncThunk(
    "authentication/registration",
    async (user: IUserRegistration, thunkApi) => {
        try {
            const response = await AuthService.registration(user);
            localStorage.setItem("token", response.data.accessToken);
            router.navigate(createPath({path: ROUTE.MAIN}));
            thunkApi.dispatch(createTimeoutNotification({
                notification: {type: "success", title: "Регистрация прошла успешно", description: "Ссылка для активации аккаунта была отправлена на ваш почтовый адрес"},
                expirationTime: 5000
            }))
            return response.data;
        } catch (error) {
            thunkApi.dispatch(createTimeoutErrorNotification(error));
            return thunkApi.rejectWithValue(error);
        }
    }
)
export const logout = createAsyncThunk(
    "authentication/logout",
    async (arg, thunkApi) => {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            router.navigate(createPath({path: ROUTE.USER_LOGIN}));
            thunkApi.dispatch(createTimeoutNotification({notification: {type: "success", title: "Вы успешно вышли из учетной записи"}}) )
            return;
        }
        catch (error) {
            thunkApi.dispatch(createTimeoutErrorNotification(error));
            return thunkApi.rejectWithValue(error);
        }
    }
)
export const checkAuthentication = createAsyncThunk(
    "authentication/checkAuthentication",
    async (arg, thunkApi) => {
        try {
            const response = await AuthService.refreshToken();
            localStorage.setItem("token", response.data.accessToken);
            return response.data;
        }
        catch (error) {
            thunkApi.dispatch(createTimeoutErrorNotification(error));
            return thunkApi.rejectWithValue(error);
        }
    }
)