import {
    combineReducers,
    configureStore,
    Action,
    Dispatch,
    Middleware,
} from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";

// own modules
import filters from "../reducers/filters";
import products from "../reducers/products";
import notifications from "../reducers/notifications";
import authentication from "../reducers/authentication";
import categories from "../reducers/categories";


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
        console.log("will dispatch: ", action);
        oldDispatch(action);
        console.log("state after dispatch: ", store.getState());
    }
    return store;
}

// reducers && store
const store = configureStore({
    reducer: combineReducers({filters, products, notifications, authentication, categories}),
    middleware: [ReduxThunk],
    preloadedState: undefined,
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [loggerEnhancer]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;