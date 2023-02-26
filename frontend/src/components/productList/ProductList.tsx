import React, {FC, useEffect, useRef} from 'react';
import {Box} from "@mui/material";
import {createSelector} from "@reduxjs/toolkit";
// own modules
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import ProductCard from "../productCard/ProductCard";
// actions
import {productsFetchingServer} from "../../store/thunks/products";
// types
import {IProduct} from "../../models/IProduct";
import {RootState} from "../../store";
import {IFilter} from "../../models/IFilter";

const ProductList: FC = () => {
    const dataFetchedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();


    const filteredProductsSelector = createSelector(
        (state: RootState) => state.filters.filters,
        (state: RootState) => state.products.products,
        (filters: IFilter, products: IProduct[]) => {
            let filteredProducts: IProduct[] = products;

            if(filters.nameQuery) {
                filteredProducts = products.filter( product => product.name.toLowerCase().includes(filters.nameQuery!.toLowerCase()) )
            }

            return filteredProducts;
        }
    );

    const filteredProducts = useAppSelector(filteredProductsSelector);

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(productsFetchingServer());
    }, [])


    return (
        <Box>
            {filteredProducts.map(item =>
                <ProductCard key={item.id+item.price} {...item}/>
            )}
        </Box>
    );
};

export default ProductList;