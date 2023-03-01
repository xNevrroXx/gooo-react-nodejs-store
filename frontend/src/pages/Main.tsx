import React from 'react';
import {Grid, Typography} from "@mui/material";
// own modules
import ProductList from "../components/productList/ProductList";
import Filters from "../components/filters/Filters";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import {useAppSelector} from "../hooks/store.hook";

const Main = () => {
    const filterCategory = useAppSelector(state => state.filters.filters.categoryId) as number | null;

    return (
        <main>
            {filterCategory &&
                <Breadcrumbs targetCategoryId={filterCategory} />
            }
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