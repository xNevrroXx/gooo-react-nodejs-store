import {
    configureStore,
    Action,
    Dispatch,
    Middleware,
} from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
// own modules
import notifications from "./slices/notifications";
import authentication from "./slices/authentication";
import filters from "./slices/filters";
import products from "./slices/products";
import categories from "./slices/categories";
import shoppingCart from "./slices/shopping-cart";


// middlewares
const loggerMiddleware: Middleware = (api) => (next: Dispatch) => <A extends Action>(action: A) => {
    console.log("will dispatch: ", action);
    next(action);
    console.log("state after dispatch: ", api.getState());
}

// enhancers
const loggerEnhancer = (createStore: any) => (...args: any) => {
    const store = createStore(...args);
    const oldDispatch = store.dispatch;
    store.dispatch = (action: any) => {
        // console.log("will dispatch: ", action);
        oldDispatch(action);
        // console.log("state after dispatch: ", store.getState());
    }
    return store;
}

// slices && store
const store = configureStore({
    reducer: {
        notifications: notifications,
        authentication: authentication,
        filters: filters,
        products: products,
        categories: categories,
        shoppingCart: shoppingCart
    },
    middleware: [reduxThunk],
    preloadedState: undefined,
    devTools: import.meta.env.DEV,
    enhancers: [loggerEnhancer]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;