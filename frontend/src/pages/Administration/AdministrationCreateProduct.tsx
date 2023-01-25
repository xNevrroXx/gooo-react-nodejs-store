import React, {FC} from 'react';
import {Box, Divider, Typography} from "@mui/material";

// own modules
import CreateProduct from "../../components/creteProduct/CreateProduct";

const AdministrationCreateProduct: FC = () => {
    return (
        <>
            <Typography variant="h1" textAlign="center">Адиминистративная панель: создание товара</Typography>
            <Divider sx={{mb: "2rem"}}/>
            <Box component="main">
                <CreateProduct />
            </Box>
        </>
    )
};

export default AdministrationCreateProduct;