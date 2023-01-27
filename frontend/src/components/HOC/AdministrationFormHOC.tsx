import {Box, Divider, SxProps, Typography} from "@mui/material";
import Login from "../login/Login";
import React, {FC, ReactNode} from "react";

interface IAdministrationFormHOC {
    label: string,
    children: ReactNode,
    wrapperFormSX?: SxProps
}
const AdministrationFormHOC: FC<IAdministrationFormHOC> = ({label, children, wrapperFormSX}) => {
    return (
        <>
            <Typography variant="h1" textAlign="center">{label}</Typography>
            <Divider sx={{mb: "2rem"}} />
            <Box component="main" sx={wrapperFormSX}>
                {children}
            </Box>
        </>
    );
};

export default AdministrationFormHOC;