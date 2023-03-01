import React, {FC, useCallback, useMemo} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import MainStyledButton from "../styledComponents/MainStyledButton";
import LinkTypography from "../styledComponents/LinkTypography";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {getNumberWithSpaces} from "../supportingFunctions/getNumberWithSpaces";
// actions & thunks
import {
    addProductToShoppingCart,
    deleteProductFromShoppingCart,
    reduceQuantityShoppingCart
} from "../../store/thunks/shopping-cart";
// types
import {IProduct, IProductInCart} from "../../models/IProduct";
import AmountCounterButton from "../amountCounterButton/AmountCounterButton";

const ProductCard: FC<IProduct> = ({id, name, stock, shortDescription, longDescription,
                                       images, createdAt, price, weight,
                                       weightUnits, categoryId}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const productsInCart = useAppSelector(state => state.shoppingCart.productsInCart) as IProductInCart[];

    const productInShoppingCart = useMemo(() => {
        return productsInCart.find(product => product.id === id)
    }, [productsInCart])

    const onOpenProduct = useCallback(() => {
        navigate(createPath({path: ROUTE.PRODUCT, params: {productId: id}}));
    }, [])

    const onClickToShoppingCart = useCallback(() => {
        dispatch(addProductToShoppingCart({productId: id}));
    }, [])

    const onMinusFromShoppingCart = useCallback(() => {
        dispatch(reduceQuantityShoppingCart({productId: id}));
    }, [])

    const onDeleteFromShoppingCart = useCallback(() => {
        dispatch(deleteProductFromShoppingCart({productId: id}));
    }, [])

    const onPlusToShoppingCart = useCallback(onClickToShoppingCart, [onClickToShoppingCart])

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

                        {productInShoppingCart ?
                            <>
                                <AmountCounterButton amount={productInShoppingCart.amountInCart} onReduce={onMinusFromShoppingCart} onAdd={onPlusToShoppingCart} maxAmount={stock} minAmount={1}/>
                                <button style={{background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".2rem"}} >
                                    <svg color="gray" height="1.2rem" width="1.2rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        <path d="M17 3L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                    <Typography display="inline" onClick={onDeleteFromShoppingCart}>Удалить</Typography>
                                </button>
                            </>
                            :
                            <MainStyledButton onClick={onClickToShoppingCart}>В корзину</MainStyledButton>
                        }
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    );
};

export default ProductCard;