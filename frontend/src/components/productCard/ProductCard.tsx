import React, {FC} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia, styled, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import MainStyledButton from "../styledComponents/MainStyledButton";
import LinkTypography from "../styledComponents/LinkTypography";
// types
import {IProduct} from "../../models/IProduct";

const ProductCard: FC<IProduct> = ({id, name, stock, shortDescription, longDescription,
                                       image, createdAt, price, thumb, weight, weightUnits,
                                       location, categoryId}) => {
    const navigate = useNavigate();
    const onOpenProduct = () => {
        navigate(`/product/${id}`);
    }

    return (
        <Card sx={{
            height: "13rem",
            display: "flex",
            gap: "1rem",
            padding: "2rem 2rem",
            borderRadius: "0",
            boxShadow: "0 0 1px gray"
        }}>
            <CardActionArea onClick={onOpenProduct} sx={{height: "100%", maxWidth: "10rem"}}>
                <CardMedia src={thumb} alt={name} component="img" sx={{height: "100%", objectFit: "contain"}}/>
            </CardActionArea>

            <CardContent>
                <LinkTypography onClick={onOpenProduct} variant="h6" color="#3757c5">{name}</LinkTypography>
                <Typography>{shortDescription}</Typography>
            </CardContent>

            <CardActions sx={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <LinkTypography variant="body1">
                    <span>{price}</span>
                    &nbsp;
                    <span>₽</span>
                </LinkTypography>
                <MainStyledButton>В корзину</MainStyledButton>
            </CardActions>
        </Card>
    );
};

export default ProductCard;