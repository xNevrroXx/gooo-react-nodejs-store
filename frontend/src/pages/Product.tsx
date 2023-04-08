import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {Typography, Box, Stack, Paper, styled} from "@mui/material";
// own modules
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import {useAppDispatch} from "../hooks/store.hook";
import ProductService from "../services/ProductService";
import Loading from "../components/loading/Loading";
import {getNumberWithSpaces} from "../components/supportingFunctions/getNumberWithSpaces";
import ImageTabs from "../components/imageTabs/ImageTabs";
import AddToCartButton from "../components/addToCartButton/AddToCartButton";
// actions & thunks & selectors
import {createTimeoutErrorNotification} from "../store/thunks/notifications";
// types
import {IProduct} from "../models/IProduct";
import ImageSlider from "../components/imageSlider/ImageSlider";

const StyledImage = styled("img")`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin: 0 auto;
`;

const Product = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const fetchedProductRef = useRef<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        if (fetchedProductRef.current) return;
        if (!params.productId) return;

        const asyncFunc = async () => {
            const response = await ProductService.fetchById(+params!.productId!);
            setProduct(response.data.product);
            fetchedProductRef.current = true;
        }
        asyncFunc()
            .catch((error) => {
                dispatch(createTimeoutErrorNotification(error));
            });
    }, [params])

    const imageSlides = useMemo(() => {
        if (!product || !product.images) return;

        return product.images.map((image, index) => (
            <Box key={"image slide" + index} width="80vw" height="50vh" display="flex" justifyContent="center" alignItems="flex-start" >
                <StyledImage src={image} alt={"product image " + index} />
            </Box>
        ))
    }, [product])

    if(!product) {
        return <Loading/>
    }

    return (
        <>
            <Breadcrumbs targetCategoryId={product.categoryId} isLastLink={true} />
            <Typography component="h1" variant="h6" mb="2rem">{product.name}</Typography>
            <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" spacing={3} mb="3rem" sx={{ height: {xs: "msx-content", md: "600px"} }}>
                <Box sx={{ display: {xs: "none", md: "block"}, width: "50%" }}>
                    <ImageTabs images={product.images} alt={product.name}/>
                </Box>
                <Box sx={{ display: {xs: "block", md: "none"}, width: "80vw", height: "50vh", margin: "0 auto" }}>
                    <ImageSlider>
                        {imageSlides}
                    </ImageSlider>
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