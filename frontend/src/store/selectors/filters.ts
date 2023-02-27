import {createSelector} from "@reduxjs/toolkit";
// types
import {RootState} from "../index";
import {IFilter} from "../../models/IFilter";

export const countActiveFiltersSelector = createSelector(
    (state: RootState) => state.filters.filters,
    (filters: IFilter) => {
        let countActiveFilters: number = 0;

        if (filters.categoryId) countActiveFilters++;
        if (filters.price.min || filters.price.max) countActiveFilters++;
        if (filters.weight.min || filters.weight.max) countActiveFilters++;

        return countActiveFilters;
    }
)