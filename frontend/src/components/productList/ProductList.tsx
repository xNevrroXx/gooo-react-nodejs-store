import React, {FC, useEffect, useRef} from 'react';
import {Box} from "@mui/material";
// own modules
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import ProductCard from "../productCard/ProductCard";
// actions & selectors
import {productsFetchingServer} from "../../store/thunks/products";
import {filteredProductsSelector} from "../../store/selectors/products";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

const ProductList: FC = () => {
    const dataFetchedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();
    const filteredProducts = useAppSelector(filteredProductsSelector);

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(productsFetchingServer());
    }, [])


    return (
        <>
            <Box>
                {filteredProducts.map(item =>
                    <ProductCard key={item.id+item.price} {...item}/>
                )}
            </Box>
        </>
    );
};

export default ProductList;