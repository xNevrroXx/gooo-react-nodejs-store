import React from 'react';
import ProductList from "../components/productList/ProductList";
import {Box} from "@mui/material";

const Main = () => {
    return (
        <main>
            <h1>Вам может понравиться</h1>
            <Box sx={{display: "flex"}}>
                <Box sx={{width: "20%"}}>Фильтры...</Box>
                <ProductList/>
            </Box>
        </main>
    );
};

export default Main;