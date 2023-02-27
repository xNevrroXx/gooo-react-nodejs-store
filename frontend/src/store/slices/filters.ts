import {createSlice} from "@reduxjs/toolkit";
// actions & thunks
import {addFilter, resetFilters} from "../actions/filters";
// types
import {IFilters} from "../../models/IStore";
import {IFilter} from "../../models/IFilter";

const initialState: IFilters = {
    filters: {
        nameQuery: "",
        categoryId: null,
        price: {min: 0, max: 0},
        weight: {min: 0, max: 0}
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
            .addCase(resetFilters, (state, action) => {
                // function changeFilterTS<Obj extends IFilters["filters"], Key extends keyof IFilters["filters"]>(obj: Obj, key: Key, value: Obj[Key]) {
                //     obj[key] = value;
                // }
                for (const fieldKey of action.payload.filterFieldsToReset) {
                    // changeFilterTS(state.filters, fieldKey, initialState.filters[fieldKey]);
                    // @ts-ignore
                    state.filters[fieldKey] = initialState.filters[fieldKey];
                }
            })
    }
})

const {reducer} = filters;

export default reducer;