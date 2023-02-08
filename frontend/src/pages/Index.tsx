import AppHeader from "../components/appHeader/AppHeader";
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";
import React, {FC, Suspense} from "react";
import Loading from "../components/loading/Loading";

const Index: FC = () => (
    <>
        <AppHeader/>
        <Container maxWidth="xl">
            <Suspense fallback={<Loading sx={{position: "absolute", top: "0", left: "0", height: "100vh", width: "100%"}}/>}>
                <Outlet/>
            </Suspense>
        </Container>
    </>
)

export default Index;