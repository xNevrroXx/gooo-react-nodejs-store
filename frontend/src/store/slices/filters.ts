import {IFilters} from "../../models/IStore";
import {AnyAction, createSlice} from "@reduxjs/toolkit";

const initialState: IFilters = {
    filters: ["electronics", "appliances", "books",  "children's products", "sports and recreation", "зоотовары", "digital products"],
    activeFilters: [],
    filterLoadingStatus: "idle"
}

const filters = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        filterFetching: (state, action) => {
            state.filterLoadingStatus = "loading";
        },
        filterFetched: (state, action) => {
            state.filters = action.payload;
            state.filterLoadingStatus = "idle";
        },
        filterFetchingError: (state, action) => {
            state.filterLoadingStatus = "error";
        },
        activeFilters: (state, action) => {
            state.activeFilters = action.payload
        }
    }
})

const {reducer} = filters;

export default reducer;