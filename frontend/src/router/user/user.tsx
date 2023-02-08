import {Outlet, RouteObject} from "react-router-dom";
import React, {lazy} from "react";

// pages
const UserLogin = lazy(() => import("../../pages/UserLogin"));
const UserRegistration = lazy(() => import("../../pages/UserRegistration"));

export const user: RouteObject = {
    path: "/user",
    element: <Outlet/>,
    children: [
        {
            path: ":userId",
            element: <></>
        },
        {
            path: "login",
            element: <UserLogin/>
        },
        {
            path: "registration",
            element: <UserRegistration/>
        }
    ]
}