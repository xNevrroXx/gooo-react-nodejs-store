import React, {FC, useEffect, useRef} from 'react';
// own modules
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
// actions
import {productsFetchingServer} from "../../store/thunks/products";
// types
import {IProduct} from "../../models/IProduct";
import ProductCard from "../productCard/ProductCard";
import {Box} from "@mui/material";

const ProductList: FC = () => {
    const dataFetchedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products) as IProduct[];

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(productsFetchingServer());
    }, [])


    return (
        <Box>
            {products.map(item =>
                <ProductCard key={item.id+item.price} {...item}/>
            )}
        </Box>
    );
};

export default ProductList;