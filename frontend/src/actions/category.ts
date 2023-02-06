import axios from "axios";
// owm modules
import CategoryService from "../services/CategoryService";
import {createTimeoutNotificationThunk} from "./notifications";
// types
import {ICategory, ICategoryCreation} from "../models/ICategory";
import {AppDispatch} from "../store";

export const loadingCategoriesServer = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(categoriesFetching());
        const response = await CategoryService.fetch();
        dispatch(categoriesFetched(response.data.categories));
    }
    catch (error) {
        dispatch(categoriesFetchingError());
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
export const createCategoryThunk = (category: ICategoryCreation) => async (dispatch: AppDispatch) => {
    try {
        await CategoryService.create(category);
        // dispatch(categoryCreate(category));
        // todo get id and createdAt fields
    }
    catch (error) {
        dispatch(categoriesFetchingError());
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
export const deleteCategoryThunk = (id: ICategory["id"]) => async (dispatch: AppDispatch) => {
    try {
        await CategoryService.delete(id);
        dispatch(categoryDelete(id));
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

export const categoriesFetching = () => ({type: "CATEGORIES_FETCHING"});
export const categoriesFetched = (categories: ICategory[]) => ({type: "CATEGORIES_FETCHED", payload: categories});
export const categoriesFetchingError = () => ({type: "CATEGORIES_FETCHING_ERROR"});
export const categoryDelete = (id: ICategory["id"]) => ({type: "CATEGORY_DELETE", payload: id});
export const categoryCreate = (category: ICategory) => ({type: "CATEGORY_CREATE", payload: category});