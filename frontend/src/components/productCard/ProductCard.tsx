import React, {FC, useCallback, useMemo} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import LinkTypography from "../styledComponents/LinkTypography";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
import {useAppSelector} from "../../hooks/store.hook";
import {getNumberWithSpaces} from "../supportingFunctions/getNumberWithSpaces";
import AddToCartButton from "../addToCartButton/AddToCartButton";
// types
import {IProduct, IProductInCart} from "../../models/IProduct";

const ProductCard: FC<IProduct> = ({id, name, stock, shortDescription, longDescription,
                                       images, createdAt, price, weight,
                                       weightUnits, categoryId}) => {
    const navigate = useNavigate();

    const onOpenProduct = useCallback(() => {
        navigate(createPath({path: ROUTE.PRODUCT, params: {productId: id}}));
    }, [])

    return (
        <Card
            sx={{
            height: "13rem",
            // display: "flex",
            // gap: "1rem",
            padding: "2rem 2rem",
            borderRadius: "0",
            boxShadow: "0 0 1px gray"
        }}
        >
            <Grid height="100%" container spacing={2} justifyContent="center" alignItems="center">
                <Grid height="100%" item xs={2}>
                    <CardActionArea onClick={onOpenProduct} sx={{height: "100%", maxWidth: "10rem"}}>
                        <CardMedia src={images[0]} alt={name} component="img" sx={{height: "100%", objectFit: "contain"}}/>
                    </CardActionArea>
                </Grid>
                <Grid height="100%" item xs={8}>
                    <CardContent>
                        <LinkTypography onClick={onOpenProduct} variant="h6" color="#3757c5" sx={{mb: "1rem"}}>{name}</LinkTypography>
                        <Typography>{shortDescription}</Typography>
                    </CardContent>
                </Grid>
                <Grid height="100%" item xs={2}>
                    <CardActions sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                        <LinkTypography whiteSpace="nowrap" variant="h6">
                            { getNumberWithSpaces(price) }
                            <Typography variant="body1" fontWeight="medium" component="span">₽</Typography>
                        </LinkTypography>

                        <AddToCartButton productId={id} stock={stock}/>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductCard;