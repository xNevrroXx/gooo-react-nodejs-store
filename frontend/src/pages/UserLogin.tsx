import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import Login from "../components/login/Login";

const UserLogin = () => {
    return (
        <>
            <Typography variant="h1" textAlign="center" >Привет, мы тебя ждали!</Typography>
            <Divider />
            <Box component="main" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
                <Login />
            </Box>
        </>
    );
};

export default UserLogin;