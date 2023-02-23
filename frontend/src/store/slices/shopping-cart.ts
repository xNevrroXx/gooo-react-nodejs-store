import {createSlice} from "@reduxjs/toolkit";
// types
import {IProductsInCart} from "../../models/IStore";
import {changeProductIsSelectedField} from "../actions/shopping-cart";

const initialState: IProductsInCart = {
    productsInCart: [],
    cartLoadingStatus: "idle"
}

const shoppingCart = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(changeProductIsSelectedField, (state, action) => {
                const changedProduct = state.productsInCart.find(product => product.id === action.payload.productId);
                changedProduct!.isSelected = action.payload.isSelected;
            })
    }
})

const {reducer, actions} = shoppingCart;

export default reducer;

export const {

} = actions;