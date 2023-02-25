import {createSlice} from "@reduxjs/toolkit";
// actions & thunks
import {
    addProductToShoppingCart,
    changeSelectShoppingCart,
    deleteProductFromShoppingCart,
    fetchShoppingCart,
    reduceQuantityShoppingCart
} from "../thunks/shopping-cart";
// types
import {IShoppingCart} from "../../models/IStore";

const initialState: IShoppingCart = {
    productsInCart: [],
    cartLoadingStatus: "idle"
}

const shoppingCart = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchShoppingCart.pending, (state) => {
                state.cartLoadingStatus = "loading";
            })
            .addCase(fetchShoppingCart.fulfilled, (state, action) => {
                state.cartLoadingStatus = "idle";
                state.productsInCart = action.payload.data.products;
            })
            .addCase(fetchShoppingCart.rejected, (state, action) => {
                state.cartLoadingStatus = "error";
            })
            .addCase(addProductToShoppingCart.fulfilled, (state, action) => {
                const foundProductInCart = state.productsInCart.find(product => product.id === action.payload.product.id);

                if(foundProductInCart) {
                    foundProductInCart.amountInCart++;
                }
                else {
                    state.productsInCart.push({
                        ...action.payload.product,
                        isSelected: true,
                        amountInCart: 1
                    })
                }
            })
            .addCase(deleteProductFromShoppingCart.fulfilled, (state, action) => {
                state.productsInCart = state.productsInCart.filter(product => product.id !== action.payload);
            })
            .addCase(reduceQuantityShoppingCart.fulfilled, (state, action) => {
                const foundProductInCart = state.productsInCart.find(product => product.id === action.payload);
                foundProductInCart!.amountInCart--;
            })
            .addCase(changeSelectShoppingCart.fulfilled, (state, action) => {
                const foundProductInCart = state.productsInCart.find(product => product.id === action.payload.productId);
                foundProductInCart!.isSelected = action.payload.isSelected;
            })
    }
})

const {reducer, actions} = shoppingCart;

export default reducer;