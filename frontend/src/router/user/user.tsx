import {Outlet, RouteObject} from "react-router-dom";
import React, {lazy} from "react";

// pages
const UserLogin = lazy(() => import("../../pages/UserLogin"));
const UserRegistration = lazy(() => import("../../pages/UserRegistration"));
const RecoveryPage = lazy(() => import("../../pages/RecoveryAccess"));
const RecoveryPasswordStart = lazy(() => import("../../components/recoveryPasswordForms/RecoveryPasswordStart"));
const RecoveryPasswordFinish = lazy(() => import("../../components/recoveryPasswordForms/RecoveryPasswordFinish"));

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
        },
        {
            path: "recovery",
            element: <RecoveryPage/>,
            children: [
                {
                    path: "get-link",
                    element: <RecoveryPasswordStart/>
                },
                {
                    path: ":recoveryLink",
                    element: <RecoveryPasswordFinish/>
                }
            ]
        }
    ]
}