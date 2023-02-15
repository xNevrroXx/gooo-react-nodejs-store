// third-party modules
import {createSlice} from "@reduxjs/toolkit";
// actions
import {productCreateServer, productDeleteServer, productsFetchingServer} from "../thunks/products";
// types
import {IProducts} from "../../models/IStore";

const initialState: IProducts = {
    products: [],
    productLoadingStatus: "idle"
}

const products = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(productsFetchingServer.pending, (state, action) => {
                state.productLoadingStatus = "loading";
            })
            .addCase(productsFetchingServer.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.productLoadingStatus = "idle";
            })
            .addCase(productCreateServer.fulfilled, (state, action) => {
                state.products.push(action.payload.product);
            })
            .addCase(productDeleteServer.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            })

    }
})

const {reducer} = products;

export default reducer;