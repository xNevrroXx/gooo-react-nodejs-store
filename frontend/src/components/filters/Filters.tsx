import React, {ChangeEvent, FC, useMemo} from 'react';
import {Stack, Typography, TextField, Button} from "@mui/material";
// own modules
import CategoryTree from "../categoryTree/CategoryTree";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
// types
import {ICategory} from "../../models/ICategory";
import {IFilter} from "../../models/IFilter";
// actions & thunks & selectors
import {addFilter, resetFilters} from "../../store/actions/filters";
import {filteredProductsSelector} from "../../store/selectors/products";
import {countActiveFiltersSelector} from "../../store/selectors/filters";


const Filters: FC = () => {
    const filteredProducts = useAppSelector(filteredProductsSelector);
    const countActiveFilters = useAppSelector(countActiveFiltersSelector)
    const filters = useAppSelector(state => state.filters.filters) as IFilter;
    const dispatch = useAppDispatch();

    const onResetAllFilters = () => {
        dispatch(resetFilters({filterFieldsToReset: ["categoryId", "weight", "price"]}))
    }
    const onSelectCategory = (category: ICategory) => {
        dispatch(addFilter({filterType: "categoryId", value: category.id}))
    }
    const onChangeMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
        const newMinPrice = event.target.value;
        dispatch(addFilter({filterType: "price", value: {min: +newMinPrice, max: filters.price.max} }))
    }
    const onChangeMaxPrice = (event: ChangeEvent<HTMLInputElement>) => {
        const newMaxPrice = event.target.value;
        dispatch(addFilter({filterType: "price", value: {min: filters.price.min, max: +newMaxPrice} }))
    }
    const onChangeMinWeight = (event: ChangeEvent<HTMLInputElement>) => {
        const newMinWeight = event.target.value;
        dispatch(addFilter({filterType: "weight", value: {min: +newMinWeight, max: filters.weight.max} }))
    }
    const onChangeMaxWeight = (event: ChangeEvent<HTMLInputElement>) => {
        const newMaxWeight = event.target.value;
        dispatch(addFilter({filterType: "weight", value: {min: filters.weight.min, max: +newMaxWeight} }))
    }

    const parametersAllProducts: {minPrice: number, maxPrice: number, minWeight: number, maxWeight: number} = useMemo(() => {
        if (filteredProducts.length > 0) {
            const sortedByPrice = [...filteredProducts].sort((a, b) => {
                return a.price - b.price;
            });

            const sortedByWeight = [...filteredProducts].sort((a, b) => {
                return a.weight - b.weight;
            });


            return {
                minPrice: sortedByPrice[0].price,
                maxPrice: sortedByPrice[sortedByPrice.length - 1].price,
                minWeight: sortedByWeight[0].weight,
                maxWeight: sortedByWeight[sortedByWeight.length - 1].weight,
            }
        }
        return {
            minPrice: 0,
            maxWeight: 0,
            minWeight: 0,
            maxPrice: 0
        }
    }, [filteredProducts])

    const resetFiltersButton = useMemo(() => {
        if (countActiveFilters > 0) {
            return (
                <Button
                    onClick={onResetAllFilters}
                    startIcon={(
                        <svg color="gray" height="1.2rem" width="1.2rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M17 3L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    )}
                >
                    Сбросить все фильтры({countActiveFilters})
                </Button>
            )
        }
        return null;
    }, [countActiveFilters])

    return (
        <Stack spacing={3}>
            {resetFiltersButton}
            <Stack spacing={1}>
                <Typography fontWeight="bold" variant="body1">Категории</Typography>
                <CategoryTree onSelectCategory={onSelectCategory}/>
            </Stack>
            <Stack spacing={1}>
                <Typography fontWeight="bold" variant="body1">Цена</Typography>
                <Stack direction="row" spacing={2}>
                    <TextField value={filters.price.min !== 0 ? filters.price.min : ""} onChange={onChangeMinPrice} size="small" placeholder={"от " + parametersAllProducts.minPrice}/>
                    <TextField value={filters.price.max !== 0 ? filters.price.max : ""} onChange={onChangeMaxPrice} size="small" placeholder={"до " + parametersAllProducts.maxPrice}/>
                </Stack>
            </Stack>
            <Stack spacing={1}>
                <Typography fontWeight="bold" variant="body1">Вес</Typography>
                <Stack direction="row" spacing={2} height="2rem">
                    <TextField value={filters.weight.min !== 0 ? filters.weight.min : ""} onChange={onChangeMinWeight} size="small" placeholder={"от " + parametersAllProducts.minWeight}/>
                    <TextField value={filters.weight.max !== 0 ? filters.weight.max : ""} onChange={onChangeMaxWeight} size="small" placeholder={"до " + parametersAllProducts.maxWeight}/>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Filters;