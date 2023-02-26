import {createSlice} from "@reduxjs/toolkit";
// actions & thunks
import {addFilter} from "../actions/filters";
// types
import {IFilters} from "../../models/IStore";
import {IFilter, TFilterField} from "../../models/IFilter";

const initialState: IFilters = {
    filters: {
        nameQuery: null,
        categoryId: null,
        price: null,
        weight: null
    },
}


const filters = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        // filterFetching: (state, action) => {
        //     state.filterLoadingStatus = "loading";
        // },
        // filterFetched: (state, action) => {
        //     state.filters = action.payload;
        //     state.filterLoadingStatus = "idle";
        // },
        // filterFetchingError: (state, action) => {
        //     state.filterLoadingStatus = "error";
        // },
        // activeFilters: (state, action) => {
        //     state.activeFilters = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFilter, (state, action) => {
                const key: keyof IFilter = action.payload.filterType;
                const value = action.payload.value;

                // @ts-ignore
                state.filters[key] = value;
            })
    }
})

const {reducer} = filters;

export default reducer;