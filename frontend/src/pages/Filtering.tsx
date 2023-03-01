import React, {FC, useEffect, useRef} from 'react';
import {Grid} from "@mui/material";
import {Navigate, useLocation, useSearchParams} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import Filters from "../components/filters/Filters";
import FilteredProductList from "../components/productLists/FilteredProductList";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import {createPath} from "../router/createPath";
import {ROUTE} from "../router";
// actions & thunks & selectors
import {countActiveFiltersSelector} from "../store/selectors/filters";
import {setFilters} from "../store/actions/filters";
// types
import {IFilter, TFilterSearchLinkAllString} from "../models/IFilter";
import SortingSwitch from "../components/sortingSwitch/SortingSwitch";

const Filtering: FC = () => {
    const {search} = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters.filters) as IFilter;
    const checkedSearchQueryRef = useRef<boolean>(false);
    const location = useLocation();
    const countActiveFilters = useAppSelector(countActiveFiltersSelector);

    useEffect(() => {
        if (checkedSearchQueryRef.current) return;

        const values = search.slice(1,).split("&").reduce<TFilterSearchLinkAllString>((accumulator, current) => {
            const searchAndValue = current.split("=");

            return {
                ...accumulator,
                [searchAndValue[0].toLowerCase()]: searchAndValue[1]
            };
        }, {});

        let extractedFilters: IFilter = {} as IFilter;
        for ( const filterKey of Object.keys(filters) as (keyof IFilter)[] ) {
            const value = filters[filterKey];

            if (value != null && typeof value === "object") {
                for ( const deepKey of Object.keys(filters[filterKey]!) ) {
                    // @ts-ignore
                    if (!extractedFilters[filterKey]) {
                        // @ts-ignore
                        extractedFilters[filterKey] = {};
                    }
                    // @ts-ignore
                    extractedFilters[filterKey][deepKey] = filters[filterKey][deepKey];
                }
            }
            else {
                // @ts-ignore
                extractedFilters[filterKey] = filters[filterKey];
            }
        }

        if ( values.category && extractedFilters.categoryId != +values.category ) {
            extractedFilters.categoryId = +values.category;
        }
        if ( values.minprice && extractedFilters.price.min != +values.minprice ) {
            extractedFilters.price.min = +values.minprice;
        }
        if ( values.maxprice && extractedFilters.price.max != +values.maxprice ) {
            extractedFilters.price.max = +values.maxprice;
        }
        if ( values.minweight && extractedFilters.weight.min != +values.minweight ) {
            extractedFilters.weight.min = +values.minweight;
        }
        if ( values.maxweight && extractedFilters.weight.max != +values.maxweight ) {
            extractedFilters.weight.max = +values.maxweight;
        }

        dispatch(setFilters(extractedFilters))
        checkedSearchQueryRef.current = true;
    }, [search])

    useEffect(() => {
        if (!checkedSearchQueryRef) return;

        let searchObj: TFilterSearchLinkAllString = {};
        if(filters.categoryId) searchObj.category = filters.categoryId.toString();
        if(filters.price.min) searchObj.minprice = filters.price.min.toString();
        if(filters.price.max) searchObj.maxprice = filters.price.max.toString();
        if(filters.weight.min) searchObj.minweight = filters.weight.min.toString();
        if(filters.weight.max) searchObj.maxweight = filters.weight.max.toString();
        if(filters.nameQuery) searchObj.namequery = filters.nameQuery;

        setSearchParams(searchObj, {replace: true})
    }, [filters])

    if(countActiveFilters === 0 || location.search.length === 0) {
        return <Navigate to={ createPath({path: ROUTE.MAIN}) } />
    }

    return (
        <main>
            {filters.categoryId &&
                <Breadcrumbs targetCategoryId={filters.categoryId} />
            }
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Filters/>
                </Grid>
                <Grid item xs={9}>
                    <SortingSwitch/>
                    <FilteredProductList/>
                </Grid>
            </Grid>
        </main>
    );
};

export default Filtering;