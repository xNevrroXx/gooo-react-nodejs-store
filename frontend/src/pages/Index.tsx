import {Container} from "@mui/material";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import React, {FC, Suspense} from "react";
// own modules
import AppHeader from "../components/appHeader/AppHeader";
import Loading from "../components/loading/Loading";
import {createPath} from "../router/createPath";
import {ROUTE} from "../router";

const Index: FC = () => {
    const location = useLocation();

    if(location.pathname === "/") {
        return <Navigate to={createPath({ path: ROUTE.MAIN} )} />
    }

    return (
        <>
            <AppHeader/>
            <Container maxWidth="xl" sx={{paddingTop: "5rem", paddingBottom: "2rem", minHeight: "100vh"}}>
                <Suspense fallback={<Loading sx={{position: "absolute", top: "0", left: "0", height: "100vh", width: "100%"}}/>}>
                    <Outlet/>
                </Suspense>
            </Container>
        </>
    )
}

export default Index;