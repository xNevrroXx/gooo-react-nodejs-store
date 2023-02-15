import {createSlice, isAsyncThunkAction} from "@reduxjs/toolkit";
// actions
import {categoriesFetchingServer, categoryCreateServer, categoryDeleteServer} from "../thunks/categories";
// types
import {ICategories} from "../../models/IStore";

const initialState: ICategories = {
    categories: [],
    categoryLoadingStatus: "idle"
}

const categories = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(categoriesFetchingServer.pending, (state) => {state.categoryLoadingStatus = "loading"})
            .addCase(categoriesFetchingServer.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
                state.categoryLoadingStatus = "idle";
            })
            .addCase(categoryCreateServer.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
            })
            .addCase(categoryDeleteServer.fulfilled, (state, action) => {
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })
    }
})

const {reducer} = categories;

export default reducer;