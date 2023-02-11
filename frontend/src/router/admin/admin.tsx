import {Navigate, Outlet, RouteObject} from "react-router-dom";
import React, {lazy} from "react";

// pages
const Login = lazy(() => import("../../pages/Administration/Login"));
const CreateProduct = lazy(() => import("../../pages/Administration/CreateProduct"));
const CreateCategory = lazy(() => import("../../pages/Administration/CreateCategory"));

export const admin: RouteObject = {
    element: <Outlet/>,
    path: "/administration",
    children: [
        {
            path: "login",
            element: <Login/>
        },
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