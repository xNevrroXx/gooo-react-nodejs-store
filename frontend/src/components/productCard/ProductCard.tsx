import React, {FC, useCallback} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import LinkTypography from "../styledComponents/LinkTypography";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
import {getNumberWithSpaces} from "../supportingFunctions/getNumberWithSpaces";
import AddToCartButton from "../addToCartButton/AddToCartButton";
// types
import {IProduct} from "../../models/IProduct";

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
            padding: {xs: "0.2rem", sm: "2rem 2rem"},
            borderRadius: "0",
            boxShadow: "0 0 1px gray",
        }}
        >
            <Grid height="100%" container justifyContent="center" alignItems="center" columnSpacing={{ xs: 1, sm: 2 }} >
                <Grid height="100%" item xs={5} sm={2}>
                    <CardActionArea onClick={onOpenProduct} sx={{height: "100%", maxWidth: "10rem"}}>
                        <CardMedia src={images[0]} alt={name} component="img" sx={{height: "100%", objectFit: "contain"}}/>
                    </CardActionArea>
                </Grid>
                <Grid height="100%" container spacing={2} item xs={7} sm={8} >
                    <Grid item xs={12}>
                        <CardContent sx={{
                            padding: "0",
                            "&:last-child": {paddingBottom: "0"}
                        }}>
                            <LinkTypography onClick={onOpenProduct} component="h6" color="#3757c5" padding={0}
                                sx={{
                                    typography: {
                                        xs: "body1",
                                        sm: "h6"
                                    }
                            }}>
                                {name}
                            </LinkTypography>
                            <Typography component="p" sx={{ display: {xs: "none", sm: "block"} }}>{shortDescription}</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item xs={12} display={{xs: "flex", sm: "none"}}>
                        <CardActions sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
                            <LinkTypography whiteSpace="nowrap" variant="h6">
                                { getNumberWithSpaces(price) }
                                <Typography variant="body1" fontWeight="medium" component="span">₽</Typography>
                            </LinkTypography>

                            <AddToCartButton productId={id} stock={stock}/>
                        </CardActions>
                    </Grid>
                </Grid>
                <Grid height="100%" item sm={2} display={{xs: "none", sm: "flex"}}>
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