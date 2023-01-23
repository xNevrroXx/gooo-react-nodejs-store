import {v4 as uuidv4} from "uuid";
// own types
import {INotification} from "../models/IStore";
import {INotifier} from "../models/INotifier";
import {AppDispatch} from "../store";

export const createTimeoutNotification = (notification: INotifier) => (dispatch: AppDispatch) => {
    const id: INotification["id"] = uuidv4();

    dispatch(createNotification({...notification, id}));
    setTimeout(() => {
        dispatch(deleteNotification(id));
    }, 3200)
}
export const createNotification = (notification: INotification) => {
    return {type: "CREATE_NOTIFICATION", payload: notification}
}
export const deleteNotification = (id: INotification["id"]) => {
    return {type: "DELETE_NOTIFICATION", payload: id}
}