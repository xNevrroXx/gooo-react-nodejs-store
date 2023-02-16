import {Outlet, RouteObject} from "react-router-dom";
import React, {lazy} from "react";
// pages
const CreateProduct = lazy(() => import("../../pages/Administration/CreateProduct"));
const CreateCategory = lazy(() => import("../../pages/Administration/CreateCategory"));

export const admin: RouteObject = {
    element: <Outlet/>,
    path: "/administration",
    children: [
        {
            path: "product/create",
            element: <CreateProduct/>
        },
        {
            path: "category/create",
            element: <CreateCategory/>
        },
    ]
}