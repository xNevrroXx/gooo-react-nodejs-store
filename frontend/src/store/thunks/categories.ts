// third-party modules
import {createAsyncThunk} from "@reduxjs/toolkit";
// own modules
import CategoryService from "../../services/CategoryService";
// actions
import {createTimeoutErrorNotification, createTimeoutNotification} from "./notifications";
// types
import {ICategory, ICategoryCreation} from "../../models/ICategory";

export const categoriesFetchingServer = createAsyncThunk(
    "categories/loadingCategoriesServer",
    async (args, thunkAPI) => {
        try {
            const response = await CategoryService.fetch();
            return response.data;
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error as any));
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const categoryCreateServer = createAsyncThunk(
    "categories/createCategoryServer",
    async (category: ICategoryCreation, thunkAPI) => {
        try {
            const response = await CategoryService.create(category);
            thunkAPI.dispatch(createTimeoutNotification({
                notification: {type: "success", title: "Категория создана успешно"}
            }));
            return response.data;
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error as any));
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const categoryDeleteServer = createAsyncThunk(
    "categories/deleteCategoryServer",
    async(id: ICategory["id"], thunkAPI) => {
        try {
            const response = await CategoryService.delete(id);
            thunkAPI.dispatch(createTimeoutNotification({
                notification: {type: "success", title: "Категория удалена успешно"}
            }));
            return id;
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error as any));
            return thunkAPI.rejectWithValue(error);
        }
    }
)