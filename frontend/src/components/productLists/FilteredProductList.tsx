import React, {FC, useEffect, useRef} from 'react';
import {Typography} from "@mui/material";
// own modules
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import ProductCard from "../productCard/ProductCard";
// actions & thunks & selectors
import {productsFetchingServer} from "../../store/thunks/products";
import {filteredProductsSelector} from "../../store/selectors/products";
import {sortingProductsSelector} from "../../store/selectors/filters";

const FilteredProductList: FC = () => {
    const dataFetchedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();
    const filteredProducts = useAppSelector(filteredProductsSelector);
    const sortedProducts = useAppSelector(state => sortingProductsSelector(state, filteredProducts));

    useEffect(() => {
        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(productsFetchingServer());
    }, [])


    return (
        <>
            {filteredProducts.length === 0 ? <Typography variant="h4">Продукты с заданными параметрами найти не удалось</Typography>
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

export default FilteredProductList;