// third-party modules
import React, {lazy, useEffect, useRef} from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import {RouterProvider,} from "react-router-dom";

// own components
import NotificationList from "../components/notifier/NotificationList";
import {checkAuthenticationThunk} from "../actions/authentication";
import {useAppDispatch} from "../hooks/store.hook";
import {loadingCategoriesServer} from "../actions/category";
import {router} from "../router";

const theme = createTheme({
    typography: {
        button: {
            textTransform: "none"
        },
        body2: {
            fontSize: ".7rem"
        }
    }
})

function App() {
    const dataFetchedRef = useRef<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        dispatch(loadingCategoriesServer());

        if (localStorage.getItem("token")) {
            dispatch(checkAuthenticationThunk());
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <NotificationList/>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App;
