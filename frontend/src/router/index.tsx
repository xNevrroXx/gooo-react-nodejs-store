import {createBrowserRouter, Navigate} from "react-router-dom";
import React from "react";

// own modules
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import {admin} from "./admin/admin";
import {user} from "./user/user";
import {product} from "./product/product";

export const router = createBrowserRouter([
    {
        element: <Index/>,
        path: "/",
        children: [
            user,
            admin,
            product,
            {
                element: <NotFound/>,
                path: "*"
            }
        ]
    }
])

export enum ROUTE {
    MAIN = "/main",

    // user
    USER_LOGIN = "/user/login",
    USER_REGISTRATION = "/user/registration",
    USER_PROFILE = "/user/:userId",

    // admin
    ADMIN_LOGIN = "/administration/login",
    ADMIN_PRODUCT_CREATE = "/administration/product/create",
    ADMIN_CATEGORY_CREATE = "/administration/category/create",

    // product
    PRODUCT = "/product/:productId",
}