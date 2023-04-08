// third-party modules
import {createBrowserRouter,} from "react-router-dom";
import React, {lazy} from "react";
// own modules
import {admin} from "./admin/admin";
import {user} from "./user/user";
import {product} from "./product/product";
import {shoppingCart} from "./shopping-cart/shoppingCart";
// pages
const Index = lazy(() => import("../pages/Index"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Main = lazy(() => import("../pages/Main")) ;
const Filtering = lazy(() => import("../pages/Filtering"));

export const router = createBrowserRouter([
    {
        element: <Index/>,
        path: "/",
        children: [
            user,
            admin,
            product,
            shoppingCart,
            {
                path: "/main",
                element: <Main/>
            },
            {
                path: "/filtering",
                element: <Filtering/>
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
    FILTERING = "/filtering",
    FILTERING_ALL = "/filtering?category=:category&minprice=:minPrice&maxprice=:maxPrice&minweight=:minWeight",
    FILTERING_CATEGORY = "/filtering?category=:category",
    FILTERING_NAME = "/filtering?namequery=:nameQuery",

    // user
    USER_LOGIN = "/user/login",
    USER_REGISTRATION = "/user/registration",
    USER_PROFILE = "/user/:userId",
    USER_RECOVERY_PASSWORD_START = "/user/recovery/get-link",
    USER_RECOVERY_PASSWORD_FINISH = "/user/recovery/:recoveryLink",

    // admin
    ADMIN_PRODUCT_CREATE = "/administration/product/create",
    ADMIN_CATEGORY_CREATE = "/administration/category/create",

    // product
    PRODUCT = "/product/:productId",

    // shopping cart
    SHOPPING_CART = "/cart"
}