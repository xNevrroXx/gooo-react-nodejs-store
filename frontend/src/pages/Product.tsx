import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Typography, Box, Stack, Paper} from "@mui/material";
// own modules
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import {useAppDispatch} from "../hooks/store.hook";
import MainStyledButton from "../components/styledComponents/MainStyledButton";
import ProductService from "../services/ProductService";
import Loading from "../components/loading/Loading";
import {getNumberWithSpaces} from "../components/supportingFunctions/getNumberWithSpaces";
import ImageSlider from "../components/imageSlider/ImageSlider";
// actions & thunks & selectors
import {createTimeoutErrorNotification} from "../store/thunks/notifications";
// types
import {IProduct} from "../models/IProduct";
import AddToCartButton from "../components/addToCartButton/AddToCartButton";

const Product = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const fetchedProductRef = useRef<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        if (fetchedProductRef.current) return;

        return () => {
            const asyncFunc = async () => {
                    if (params.productId) {
                    const response = await ProductService.fetchById(+params.productId);
                    setProduct(response.data.product);
                    fetchedProductRef.current = true;
                }
            }
            asyncFunc()
                .catch((error) => {
                    dispatch(createTimeoutErrorNotification(error));
                });
        }
    }, [params])

    if(!product) {
        return <Loading/>
    }

    return (
        <>
            <Breadcrumbs targetCategoryId={product.categoryId} isLastLink={true} />
            <Typography component="h1" variant="h4" mb="2rem">{product.name}</Typography>
            <Stack direction="row" justifyContent="space-between" spacing={3} height="600px" mb="3rem">
                <Box width="50%">
                    <ImageSlider images={product.images} alt={product.name}/>
                </Box>
                <Paper elevation={3} sx={{height: "max-content", padding: "1rem 1rem"}}>
                    <Stack width="15rem">
                        <Box mb="1rem">
                            <Typography variant="body1" color="gray" sx={{textDecoration: "line-through"}}>{getNumberWithSpaces(Math.round(product.price+product.price*0.1))} ₽</Typography>
                            <Typography variant="h5">{getNumberWithSpaces(product.price)} ₽</Typography>
                        </Box>

                        <AddToCartButton styleButtons={{width: "100%"}} productId={product.id} stock={product.stock}/>
                    </Stack>
                </Paper>
            </Stack>
            <Typography component="h2" variant="h4" mb="1rem">Описание</Typography>
            <Typography>{product.longDescription}</Typography>
        </>
    );
};

export default Product;