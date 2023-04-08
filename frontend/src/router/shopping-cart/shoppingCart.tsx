import {RouteObject} from "react-router-dom";
import {lazy} from "react";
// pages
const ShoppingCart = lazy(() => import("../../pages/ShoppingCart"));

export const shoppingCart: RouteObject = {
    path: "/cart",
    element: <ShoppingCart/>
}