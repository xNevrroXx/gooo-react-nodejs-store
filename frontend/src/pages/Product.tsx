import React from 'react';
import {useParams} from "react-router-dom";
import {Link, Typography} from "@mui/material";

const CircleSvg = () => (
    <svg width="5px" height="5px" fill="rgba(0,0,0,.5)" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle r="50" cx="50" cy="50" />
    </svg>
)

const Product = () => {
    const params = useParams();

    return (
        <>
            <div>
                product *{params.id}*
            </div>
        </>
    );
};

export default Product;