import {IProducts} from "../models/IStore";

const initialState: IProducts = {
    products: [],
    productLoadingStatus: "idle"
}

const products = (state: IProducts = initialState, action: {type: string, payload: any}): IProducts => {
    switch (action.type) {
        case "PRODUCTS_FETCHING":
            return {
                ...state,
                productLoadingStatus: "loading"
            }
        case "PRODUCTS_FETCHED":
            return {
                ...state,
                products: [...state.products, ...action.payload],
                productLoadingStatus: "idle"
            }
        case "PRODUCTS_FETCHING_ERROR":
            return {
                ...state,
                productLoadingStatus: "error"
            }
        case "PRODUCT_CREATE":
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case "PRODUCT_DELETE":
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload)
            }
        default: return state
    }
}

export default products;