import {Outlet, RouteObject} from "react-router-dom";
import React, {lazy} from "react";

// pages
const Main = lazy(() => import("../../pages/Main"));
const ProductPage = lazy(() => import("../../pages/Product"));

export const product: RouteObject = {
    element: <Outlet/>,
    path: "/product",
    children: [
        {
            path: ":id",
            element: <ProductPage/>
        }
    ]
};