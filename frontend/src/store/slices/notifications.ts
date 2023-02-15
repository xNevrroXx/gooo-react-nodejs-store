import {createSlice} from "@reduxjs/toolkit";
// actions
import {createNotification, deleteNotification} from "../actions/notifications";
// types
import {INotifications} from "../../models/IStore";


const initialState: INotifications = {
    notifications: []
}

const notifications = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNotification, (state, action) => {
                state.notifications = [...state.notifications, action.payload];
            })
            .addCase(deleteNotification, (state, action) => {
                state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
            })
    }
})

const {reducer, actions} = notifications;
export default reducer;