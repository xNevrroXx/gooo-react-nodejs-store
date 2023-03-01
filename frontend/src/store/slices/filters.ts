import {createSlice} from "@reduxjs/toolkit";
// actions & thunks
import {addFilter, changeSortMethod, resetFilters, setFilters} from "../actions/filters";
// types
import {IFilters} from "../../models/IStore";
import {IFilter} from "../../models/IFilter";

export const filtersInitialState: IFilters = {
    filters: {
        nameQuery: "",
        categoryId: null,
        price: {min: 0, max: 0},
        weight: {min: 0, max: 0}
    },
    sorting: {label: "По возрастанию цены", filterParam: "price", startFrom: "min"}
}


const filters = createSlice({
    name: "filters",
    initialState: filtersInitialState,
    reducers: {},
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
                    state.filters[fieldKey] = filtersInitialState.filters[fieldKey];
                }
            })
            .addCase(setFilters, (state, action) => {
                state.filters = action.payload;
            })
            .addCase(changeSortMethod, (state, action) => {
                state.sorting = action.payload;
            })
    }
})

const {reducer} = filters;

export default reducer;