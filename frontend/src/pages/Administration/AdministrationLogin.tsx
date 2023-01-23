// third-party modules
import React, {useCallback} from 'react';
import {Box, Divider, Typography} from "@mui/material";

// own modules
import Login from "../../components/login/Login";
import {createTimeoutNotification} from "../../actions/notifications";
import {useAppDispatch} from "../../hooks/store.hook";


const AdministrationLogin = () => {
    const dispatch = useAppDispatch();

    const onErrorLogin = useCallback((description: string) =>
        dispatch(createTimeoutNotification({type: "error", title: "Error", description: description})
        ), []);

    return (
        <>
            <Typography variant="h1" textAlign="center" >Administrative login</Typography>
            <Divider />
            <Box component="main" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
                <Login onErrorLogin={onErrorLogin} />
            </Box>
        </>
    );
};

export default AdministrationLogin;