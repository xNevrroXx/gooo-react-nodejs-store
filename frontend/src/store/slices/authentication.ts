// third-party modules
import {createSlice} from "@reduxjs/toolkit";
// actions
import {login, registration, logout, checkAuthentication} from "../thunks/authentication";
// types
import {IAuthentication} from "../../models/IStore";


const initialState: IAuthentication = {
    user: null,
    isAuthenticated: false
}

const authentication = createSlice({
    name: "authentication",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(checkAuthentication.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
    }
})

const {reducer} = authentication;

export default reducer;