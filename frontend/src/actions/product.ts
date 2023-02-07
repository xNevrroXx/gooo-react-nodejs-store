import axios from "axios";
// owm modules
import ProductService from "../services/ProductService";
import {createTimeoutNotificationThunk} from "./notifications";
// types
import {IProduct, IProductCreation} from "../models/IProduct";
import {AppDispatch} from "../store";

export const loadingProductsThunk = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productsFetching());
        const response = await ProductService.fetch();
        dispatch(productsFetched(response.data.products));
    }
    catch (error) {
        dispatch(productsFetchingError());
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
export const createProductThunk = (product: IProductCreation) => async (dispatch: AppDispatch) => {
    try {
        await ProductService.create(product);
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
export const deleteProductThunk = (id: IProduct["id"]) => async (dispatch: AppDispatch) => {
    try {
        await ProductService.delete(id);
        dispatch(productDelete(id));
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

export const productsFetching = () => ({type: "PRODUCTS_FETCHING"});
export const productsFetched = (products: IProduct[]) => ({type: "PRODUCTS_FETCHED", payload: products});
export const productsFetchingError = () => ({type: "PRODUCTS_FETCHING_ERROR"});
export const productCreate = (product: IProduct) => ({type: "PRODUCT_CREATE", payload: product});
export const productDelete = (id: IProduct["id"]) => ({type: "PRODUCT_DELETE", payload: id});