import {RouteObject} from "react-router-dom";
// pages
import ShoppingCart from "../../pages/ShoppingCart";

export const shoppingCart: RouteObject = {
    path: "/cart",
    element: <ShoppingCart/>
}