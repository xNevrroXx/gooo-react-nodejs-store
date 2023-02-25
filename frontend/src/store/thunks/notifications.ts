// third-party modules
import {createAsyncThunk} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
// types
import {INotifier} from "../../models/INotifier";
import {INotification} from "../../models/IStore";
// actions
import {createNotification, deleteNotification} from "../actions/notifications";

export const createTimeoutNotification = createAsyncThunk(
    "notifications/createTimeoutNotifications",
    ({notification, expirationTime = 3200}: {notification: INotifier, expirationTime?: number}, thunkApi) => {
        const id: INotification["id"] = uuidv4();
        thunkApi.dispatch(createNotification( {...notification, id}) );

        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                thunkApi.dispatch(deleteNotification(id));
                resolve();
            }, expirationTime)
        })
    }
)
export const createTimeoutErrorNotification = createAsyncThunk(
    "notifications/createTimeoutNotifications",
    (error: any, thunkApi) => {
        console.log("error: ", error);
        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                thunkApi.dispatch(createTimeoutNotification({notification: {type: "error", title: "Ошибка 401", description: "Вы не авторизованы"}}))
            }
            else if (error.response.data.message) {
                thunkApi.dispatch(createTimeoutNotification({notification: {type: "error", title: `Ошибка ${error.response.status}`, description: error.response.data.message}}) )
            }
            else if(error.response.status) {
                thunkApi.dispatch(createTimeoutNotification({notification: {type: "error", title: `Ошибка ${error.response.status}`, description: error.response.statusText}}) )
            }
        }
        else {
            if(error instanceof Error) {
                thunkApi.dispatch(createTimeoutNotification({notification: {type: "error", title: "Ошибка", description: error.message}}) )
            }
            else {
                thunkApi.dispatch(createTimeoutNotification({notification: {type: "error", title: "Ошибка", description: "Непредвиденная ошибка - мы уже занимаемся решением данной проблемы"}}) )
            }
        }
    }
)