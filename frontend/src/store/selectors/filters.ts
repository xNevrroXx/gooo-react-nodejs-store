import {createSelector} from "@reduxjs/toolkit";
// types
import {RootState} from "../index";
import {IFilter, TSorting} from "../../models/IFilter";
import {IProduct} from "../../models/IProduct";

export const sortingProductsSelector = createSelector(
    [
            (state: RootState) => state.filters.sorting as TSorting,
            (state: RootState, productArr: IProduct[]) => productArr
    ],
    (sorting, products) => {
            const arr = [...products];

            switch (sorting.filterParam) {
                    case "none":
                            return arr;
                    case "price":
                            if(sorting.startFrom === "min") {
                                    return arr.sort((a, b) => a.price - b.price)
                            }
                            else if(sorting.startFrom === "max") {
                                    return arr.sort((a, b) => b.price - a.price)
                            }
                            return arr;
                    default: return arr;
            }

    }
);
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