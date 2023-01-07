// third-party modules
import React from 'react';
import Login from "../../components/login/Login";
import {Box, Divider, Typography} from "@mui/material";

// own modules


const AdministrationLogin = () => {
    return (
        <>
            <Typography variant="h1" textAlign="center" >Administrative login</Typography>
            <Divider />
            <Box component="main" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
                <Login />
            </Box>
        </>
    );
};

export default AdministrationLogin;