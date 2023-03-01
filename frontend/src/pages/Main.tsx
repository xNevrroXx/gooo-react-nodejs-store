import React from 'react';
import {Typography} from "@mui/material";
// own modules
import ProductList from "../components/productLists/ProductList";
import SortingSwitch from "../components/sortingSwitch/SortingSwitch";

const Main = () => {
    return (
        <main>
            <Typography component="h1" variant="h4" mb="2rem">Вам может понравиться</Typography>
            <SortingSwitch/>
            <ProductList/>
        </main>
    );
};

export default Main;