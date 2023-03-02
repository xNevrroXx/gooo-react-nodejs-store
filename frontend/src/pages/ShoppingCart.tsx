import React, {FC, useCallback, useMemo} from 'react';
import {Checkbox, Divider, FormControlLabel, FormGroup, Paper, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import OnlyAuthorizedHOC from "../HOC/OnlyAuthorizedHOC";
import Loading from "../components/loading/Loading";
import MainStyledButton from "../components/styledComponents/MainStyledButton";
import {createPath} from "../router/createPath";
import {ROUTE} from "../router";
import {getNumberWithSpaces} from "../components/supportingFunctions/getNumberWithSpaces";
import ProductCard from "../components/productCard/ProductCard";
// actions & thunks & selectors
import {changeSelectShoppingCart, deleteProductFromShoppingCart} from "../store/thunks/shopping-cart";
// types
import {IShoppingCart} from "../models/IStore";
import {IProduct, IProductInCart} from "../models/IProduct";


const ShoppingCart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const shoppingCart = useAppSelector(state => state.shoppingCart) as IShoppingCart;

    const onChangeSelect = useCallback((productId: IProduct["id"], isSelected: IProductInCart["isSelected"]) => {
        dispatch(changeSelectShoppingCart({productId, isSelected}))
    }, [])

    const onDeleteAll = useCallback((productId: IProduct["id"]) => {
        dispatch(deleteProductFromShoppingCart({productId}))
    }, [])

    const view = useCallback(() => {
        if( shoppingCart.cartLoadingStatus === "loading" ) return <Loading/>;
        else if( shoppingCart.productsInCart.length > 0 ) return <View productsInCart={shoppingCart.productsInCart} onChangeSelect={onChangeSelect} onDeleteAll={onDeleteAll}/>
        else if( shoppingCart.productsInCart.length === 0 ) return (
            <Stack justifyContent="center" alignItems="center">
                <Typography component="h2" variant="h4" mb="1rem">Сложите в корзину нужные товары</Typography>
                <Typography component="h3" textAlign="center" fontWeight="normal" variant="h6" mb="1rem">А чтобы их найти, загляните на главную страницу</Typography>
                <MainStyledButton onClick={ () => navigate(createPath({path: ROUTE.MAIN})) }>На главную</MainStyledButton>
            </Stack>
        )
    }, [shoppingCart])

    return (
        <OnlyAuthorizedHOC>
            <Typography component="h1" variant="h4" mb="2rem">Корзина</Typography>

            {view()}
        </OnlyAuthorizedHOC>
    );
};

interface IViewProps {
    productsInCart: IShoppingCart["productsInCart"],
    onChangeSelect: (productId: IProduct["id"], isSelected: IProductInCart["isSelected"]) => void,
    onDeleteAll: (productId: IProduct["id"]) => void
}
const View: FC<IViewProps> = ({productsInCart, onChangeSelect, onDeleteAll}) => {
    const cartParameters = useMemo(() => productsInCart.reduce((previousValue, productInCart) => {
        if (productInCart.isSelected) {
            previousValue = {
                amount: previousValue.amount + productInCart.price*productInCart.amountInCart,
                checked: previousValue.checked + 1,
                weight: previousValue.weight + productInCart.weight*productInCart.amountInCart,
                count: previousValue.count + productInCart.amountInCart
            };
        }

        return previousValue;
    }, {amount: 0, weight: 0, checked: 0, count: 0}), [productsInCart])

    const products = productsInCart.map((product, index) => (
        <Stack key={"shopping cart product" + product.id} direction="row" spacing={1} >
            <Checkbox
                onChange={() => onChangeSelect(product.id, !product.isSelected)}
                checked={product.isSelected}
                sx={{ height: "max-content", '& .MuiSvgIcon-root': {fontSize: 28} }}
            />
            <ProductCard key={product.name + "cart"} {...product} />
        </Stack>
    ))

    return (
        <>
            <Stack width="60%" direction="row" justifyContent="flex-start" alignItems="flex-end">
                <FormGroup>
                    <FormControlLabel
                        sx={{'.MuiFormControlLabel-label': {userSelect: "none"}}}
                        control={<Checkbox sx={{'& .MuiSvgIcon-root': {fontSize: 28}}} defaultChecked/>}
                        label="Выбрать все"
                    />
                </FormGroup>
                {cartParameters.checked > 0 &&
                    <button style={{background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", paddingBottom: "9px", gap: ".2rem"}} >
                        <svg color="gray" height="1.2rem" width="1.2rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M17 3L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        {/*todo add delete all action below*/}
                        <Typography display="inline" sx={{cursor: "pointer"}} >Удалить({cartParameters.checked})</Typography>
                    </button>
                }
            </Stack>

            <Stack direction="row" width="100%" spacing={15}>
                <Stack width="60%" spacing={2}>
                    <Divider />

                    {products}
                </Stack>

                <Stack flexGrow={1} spacing={2}>
                    <MainStyledButton sx={{width: "100%", height: "3rem"}}>Перейти к оформлению</MainStyledButton>
                    <Paper
                        component={Stack}
                        spacing={2}
                        elevation={3}
                        sx={{backgroundColor: "#f8f7f5", padding: "1rem 1.5rem"}}
                    >
                        <Stack direction="row" justifyContent="space-between" width="100%">
                            <Typography variant="h6">Итого</Typography>
                            <Typography variant="h6">{getNumberWithSpaces(cartParameters.amount)}₽</Typography>
                        </Stack>
                        <Typography>Всего: {cartParameters.count} шт • {cartParameters.weight}гр</Typography>
                    </Paper>
                </Stack>
            </Stack>
        </>
    );
}

export default ShoppingCart;