import React from 'react';
import {Box, Divider, Typography} from "@mui/material";
import Registration from "../components/registration/Registration";

const UserLogin = () => {
    return (
        <>
            <Typography variant="h1" textAlign="center" >Привет, рады знакомству с тобой!</Typography>
            <Divider sx={{mb: "2rem"}}/>
            <Box component="main" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
                <Registration />
            </Box>
        </>
    );
};

export default UserLogin;