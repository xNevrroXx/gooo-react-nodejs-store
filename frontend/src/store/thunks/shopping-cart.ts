import {createAsyncThunk} from "@reduxjs/toolkit";
// own modules
import {createTimeoutErrorNotification} from "./notifications";
import ShoppingCart from "../../services/ShoppingCart";
// types
import {IProduct, IProductInCart} from "../../models/IProduct";

export const fetchShoppingCart = createAsyncThunk(
    "shoppingCart/fetchCart",
    async (arg, thunkAPI) => {
        try {
            return ShoppingCart.fetchShoppingCart();
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const addProductToShoppingCart = createAsyncThunk(
    "shoppingCart/addProduct",
    async ({productId}: {productId: IProduct["id"]}, thunkAPI) => {
        try {
            const response = await ShoppingCart.addProductToShoppingCart(productId);
            return response.data;
        }
        catch (error) {
            console.log("shopping-cart")
            thunkAPI.dispatch(createTimeoutErrorNotification(error));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const reduceQuantityShoppingCart = createAsyncThunk(
    "shoppingCart/reduceQuantity",
    async ({productId}: {productId: IProduct["id"]}, thunkAPI) => {
        try {
            await ShoppingCart.reduceQuantity(productId);
            return productId
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const changeSelectShoppingCart = createAsyncThunk(
    "shoppingCart/changeSelect",
    async ({productId, isSelected}: {productId: IProduct["id"], isSelected: IProductInCart["isSelected"]}, thunkAPI) => {
        try {
            await ShoppingCart.changeSelect(productId, isSelected);
            return {productId, isSelected}
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error));
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteProductFromShoppingCart = createAsyncThunk(
    "shoppingCart/deleteProduct",
    async ({productId}: {productId: IProduct["id"]}, thunkAPI) => {
        try {
            await ShoppingCart.deleteProductFromShoppingCart(productId);
            return productId
        }
        catch (error) {
            thunkAPI.dispatch(createTimeoutErrorNotification(error));
            return thunkAPI.rejectWithValue(error);
        }
    }
)