import {createAction} from "@reduxjs/toolkit";
// types
import {INotification} from "../../models/IStore";

export const createNotification = createAction<INotification>("notifications/createNotification");
export const deleteNotification = createAction<INotification["id"]>("notifications/deleteNotification");