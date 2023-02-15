import {createAsyncThunk} from "@reduxjs/toolkit";
import ProductService from "../../services/ProductService";
// actions
import {createTimeoutErrorNotification, createTimeoutNotification} from "./notifications";
// types
import {IProduct, IProductCreation} from "../../models/IProduct";

export const productsFetchingServer = createAsyncThunk(
    "products/loadingProductsServer",
    async (args, thunkAPI) => {
        try {
            const response = await ProductService.fetch();
            return response.data;
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error as any));
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const productCreateServer = createAsyncThunk(
    "products/createProductServer",
    async (product: IProductCreation, thunkAPI) => {
        try {
            const response = await ProductService.create(product);
            thunkAPI.dispatch(createTimeoutNotification({
                notification: {
                    type: "success",
                    title: "Продукт был успешно создан"
                }
            }));
            return response.data;
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error as any));
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const productDeleteServer = createAsyncThunk(
    "products/deleteProductServer",
    async (id: IProduct["id"], thunkAPI) => {
        try {
            const response = await ProductService.delete(id);
            thunkAPI.dispatch(createTimeoutNotification({
                notification: {
                    type: "success",
                    title: "Продукт был успешно удален"
                }
            }));
            return id;
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error as any));
            return thunkAPI.rejectWithValue(error);
        }
    }
)