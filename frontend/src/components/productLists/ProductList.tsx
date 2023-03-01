import React, {FC, useEffect, useRef} from 'react';
import {Typography} from "@mui/material";
// own modules
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import ProductCard from "../productCard/ProductCard";
// actions & thunks & selectors
import {productsFetchingServer} from "../../store/thunks/products";
import {sortingProductsSelector} from "../../store/selectors/filters";
// types
import {IProduct} from "../../models/IProduct";

const ProductList: FC = () => {
    const dataFetchedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products) as IProduct[];
    const sortedProducts = useAppSelector(state => sortingProductsSelector(state, products));

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(productsFetchingServer());
    }, [])


    return (
        <>
            {products.length === 0 ? <Typography variant="h4">Здесь пока что нет продуктов</Typography>
                :
                <>
                    {sortedProducts.map(item =>
                        <ProductCard key={item.id+item.price} {...item}/>
                    )}
                </>
            }
        </>
    );
};

export default ProductList;