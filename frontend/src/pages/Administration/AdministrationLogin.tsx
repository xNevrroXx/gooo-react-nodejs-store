// third-party modules
import React from 'react';
import Login from "../../components/login/Login";
import {Box, Divider, Typography} from "@mui/material";
import {CSSTransition} from "react-transition-group";
import Notifier from "../../components/notifier/Notifier";
import {useNotifier} from "../../hooks/notifier.hook";
import {INotifier} from "../../models/INotifier";

// own modules


const AdministrationLogin = () => {
    const {onShowNotifier, isShowNotifier, onHideNotifier, descriptionNotifier, titleNotifier, typeIconNotifier} = useNotifier();

    const onErrorLogin = (props: INotifier) => {
        onShowNotifier(props);
        setTimeout(() => {
            onHideNotifier();
        }, 3200)
    }

    return (
        <>
            <CSSTransition classNames="notifier" in={isShowNotifier} timeout={200} mountOnEnter={true}>
                <Notifier type={typeIconNotifier} title={titleNotifier} description={descriptionNotifier}/>
            </CSSTransition>
            <Typography variant="h1" textAlign="center" >Administrative login</Typography>
            <Divider />
            <Box component="main" sx={{display: "flex", flexDirection: "column", justifyContent: "center", height: "60vh"}}>
                <Login onErrorLogin={(description: string) => onErrorLogin({type: "error", title: "Error", description: description})} />
            </Box>
        </>
    );
};

export default AdministrationLogin;