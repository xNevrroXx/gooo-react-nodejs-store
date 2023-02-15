// third-party modules
import {createBrowserRouter} from "react-router-dom";
import React from "react";
// own modules
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import {admin} from "./admin/admin";
import {user} from "./user/user";
import {product} from "./product/product";
// pages
import Main from "../pages/Main";

export const router = createBrowserRouter([
    {
        element: <Index/>,
        path: "/",
        children: [
            user,
            admin,
            product,
            {
                path: "/main",
                element: <Main/>
            },
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
    USER_RECOVERY_PASSWORD_START = "/user/recovery/get-link",
    USER_RECOVERY_PASSWORD_FINISH = "/user/recovery/:recoveryLink",

    // admin
    ADMIN_LOGIN = "/administration/login",
    ADMIN_PRODUCT_CREATE = "/administration/product/create",
    ADMIN_CATEGORY_CREATE = "/administration/category/create",

    // product
    PRODUCT = "/product/:productId",
}