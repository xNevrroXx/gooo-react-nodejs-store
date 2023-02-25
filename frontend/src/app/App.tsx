// third-party modules
import React, {useEffect, useRef} from 'react';
import {createTheme, ThemeProvider} from "@mui/material";
import {RouterProvider,} from "react-router-dom";
// own components
import NotificationList from "../components/notifier/NotificationList";
import {useAppDispatch} from "../hooks/store.hook";
import {router} from "../router";
// actions
import {checkAuthentication} from "../store/thunks/authentication";
import {createTimeoutNotification} from "../store/thunks/notifications";
import {categoriesFetchingServer} from "../store/thunks/categories";
import {fetchShoppingCart} from "../store/thunks/shopping-cart";

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
        dispatch(createTimeoutNotification({
            notification: {
                type: "information",
                title: "Здравствуйте",
                description: "Спасибо, что уделили время данному проекту. Пожалуйста, дайте знать, понравилось ли вам его использование. Если нет - почему."
            },
            expirationTime: 9000
            }
        ));
        dispatch(categoriesFetchingServer());

        if (localStorage.getItem("token")) {
            dispatch(checkAuthentication());
            dispatch(fetchShoppingCart());
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
