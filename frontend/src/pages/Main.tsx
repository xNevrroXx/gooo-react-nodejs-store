import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
// own modules
import ProductList from "../components/productList/ProductList";
import Filters from "../components/filters/Filters";

const Main = () => {
    return (
        <main>
            <Typography component="h1" variant="h4" mb="2rem">Вам может понравиться</Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Filters/>
                </Grid>
                <Grid item xs={9}>
                    <ProductList/>
                </Grid>
            </Grid>
        </main>
    );
};

export default Main;