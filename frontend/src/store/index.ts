import {combineReducers, configureStore} from "@reduxjs/toolkit";

// own modules
import filters from "../reducers/filters";
import goods from "../reducers/goods";

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
    reducer: combineReducers({filters, goods}),
    preloadedState: undefined,
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [loggerEnhancer]
})

export default store;