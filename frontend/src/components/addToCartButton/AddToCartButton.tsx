import React, {CSSProperties, FC, useCallback} from 'react';
import {Stack, Typography} from "@mui/material";
// own modules
import AmountCounterButton from "../amountCounterButton/AmountCounterButton";
import MainStyledButton from "../styledComponents/MainStyledButton";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
// thunks
import {
    addProductToShoppingCart,
    deleteProductFromShoppingCart,
    reduceQuantityShoppingCart
} from "../../store/thunks/shopping-cart";
// types
import {IProduct, IProductInCart} from "../../models/IProduct";

interface IAddToCartProps {
    productId: IProduct["id"],
    stock: IProduct["stock"],
    styleButtons?: CSSProperties
}
const AddToCartButton: FC<IAddToCartProps> = ({productId, stock, styleButtons}) => {
    const dispatch = useAppDispatch();

    const productInCart = useAppSelector(state =>
        state.shoppingCart.productsInCart.find((product: IProductInCart) => product.id === productId)
    ) as IProductInCart | undefined;

    const onMinusFromShoppingCart = useCallback(() => {
        dispatch(reduceQuantityShoppingCart({productId}));
    }, [])

    const onDeleteFromShoppingCart = useCallback(() => {
        dispatch(deleteProductFromShoppingCart({productId}));
    }, [])

    const onAddToShoppingCart = useCallback(() => {
        dispatch(addProductToShoppingCart({productId}));
    }, [])

    if (productInCart) {
        return (
            <Stack spacing="1rem" justifyContent="center" alignItems="center">
                <AmountCounterButton style={styleButtons} amount={productInCart?.amountInCart} onReduce={onMinusFromShoppingCart} onAdd={onAddToShoppingCart} maxAmount={stock} minAmount={1}/>

                <button style={{background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".2rem", padding: ".5rem"}} >
                    <svg color="gray" height="1.2rem" width="1.2rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M17 3L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <Typography display="inline" onClick={onDeleteFromShoppingCart}>Удалить</Typography>
                </button>
            </Stack>
        )
    }

    return (
        <MainStyledButton sx={styleButtons} onClick={onAddToShoppingCart}>В корзину</MainStyledButton>
    );
};

export default AddToCartButton;