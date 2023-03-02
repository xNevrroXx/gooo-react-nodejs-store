import React, {FC, useEffect, useRef} from 'react';
import {Grid} from "@mui/material";
import {useLocation, useSearchParams} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import Filters from "../components/filters/Filters";
import FilteredProductList from "../components/productLists/FilteredProductList";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import SortingSwitch from "../components/sortingSwitch/SortingSwitch";
// actions & thunks & selectors
import {setFilters} from "../store/actions/filters";
// types
import {IFilter, TFilterSearchLinkAllString} from "../models/IFilter";

const Filtering: FC = () => {
    const {search} = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters.filters) as IFilter;
    const checkedSearchQueryRef = useRef<boolean>(false);
    const checkedSearchParamsRef = useRef<boolean>(false);

    useEffect(() => {
        if (checkedSearchQueryRef.current) return; // false => return
        checkedSearchQueryRef.current = true;

        // adds up all the query search params to the convenient to use object
        const values = search.slice(1,).split("&").reduce<TFilterSearchLinkAllString>((accumulator, current) => {
            const searchAndValue = current.split("=");

            return {
                ...accumulator,
                [decodeURI(searchAndValue[0].toLowerCase())]: decodeURI(searchAndValue[1])
            };
        }, {});

        let deeplyCopiedFilters: IFilter = {} as IFilter;
        function copyFieldTS <Obj extends {}, Key extends keyof Obj> (sourceObj: Obj, targetObj: Obj, key: Key) {
            targetObj[key] = sourceObj[key];
        }
        for ( const filterKey of Object.keys(filters) as (keyof IFilter)[] ) {
            const value = filters[filterKey];

            if (value != null && typeof value === "object") {
                for ( const deepKey of Object.keys(filters[filterKey]!) ) {
                    if (!deeplyCopiedFilters[filterKey]) {
                        deeplyCopiedFilters[filterKey] = {} as never;
                    }
                    copyFieldTS(value, deeplyCopiedFilters[filterKey] as {}, deepKey as never);
                }
            }
            else {
                copyFieldTS(filters, deeplyCopiedFilters, filterKey);
            }
        }

        if ( values.category && deeplyCopiedFilters.categoryId != +values.category ) {
            deeplyCopiedFilters.categoryId = +values.category;
        }
        if ( values.minprice && deeplyCopiedFilters.price.min != +values.minprice ) {
            deeplyCopiedFilters.price.min = +values.minprice;
        }
        if ( values.maxprice && deeplyCopiedFilters.price.max != +values.maxprice ) {
            deeplyCopiedFilters.price.max = +values.maxprice;
        }
        if ( values.minweight && deeplyCopiedFilters.weight.min != +values.minweight ) {
            deeplyCopiedFilters.weight.min = +values.minweight;
        }
        if ( values.maxweight && deeplyCopiedFilters.weight.max != +values.maxweight ) {
            deeplyCopiedFilters.weight.max = +values.maxweight;
        }
        if ( values.namequery && deeplyCopiedFilters.nameQuery !== values.namequery ) {
            deeplyCopiedFilters.nameQuery = values.namequery;
        }

        dispatch(setFilters(deeplyCopiedFilters));
    }, [search])

    useEffect(() => {
        if (!checkedSearchQueryRef.current && checkedSearchParamsRef.current) return; //
        checkedSearchParamsRef.current = true;

        let searchObj: TFilterSearchLinkAllString = {};
        if(filters.categoryId) searchObj.category = filters.categoryId.toString();
        if(filters.price.min) searchObj.minprice = filters.price.min.toString();
        if(filters.price.max) searchObj.maxprice = filters.price.max.toString();
        if(filters.weight.min) searchObj.minweight = filters.weight.min.toString();
        if(filters.weight.max) searchObj.maxweight = filters.weight.max.toString();
        if(filters.nameQuery) searchObj.namequery = filters.nameQuery;

        setSearchParams(searchObj);
    }, [filters])

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