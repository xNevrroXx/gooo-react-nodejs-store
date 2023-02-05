import React from 'react';
import {useParams} from "react-router-dom";
import {Breadcrumbs, Link, Typography} from "@mui/material";

const CircleSvg = () => (
    <svg width="5px" height="5px" fill="rgba(0,0,0,.5)" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle r="50" cx="50" cy="50" />
    </svg>
)

const Product = () => {
    const params = useParams();

    return (
        <>
            <Breadcrumbs maxItems={4} separator={<CircleSvg/>} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    MUI
                </Link>
                <Link underline="hover" color="inherit" href="/">
                    MUI1
                </Link>
                <Link underline="hover" color="inherit" href="/">
                    MUI2
                </Link>
                <Link underline="hover" color="inherit" href="/">
                    MUI3
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Core
                </Link>
                <Typography color="text.primary">Breadcrumbs</Typography>
            </Breadcrumbs>
            <div>
                product *{params.id}*
            </div>
        </>
    );
};

export default Product;