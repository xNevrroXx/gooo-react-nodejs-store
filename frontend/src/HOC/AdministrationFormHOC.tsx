import {Box, Divider, SxProps, Typography} from "@mui/material";
import React, {FC, ReactNode, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {createPath} from "../router/createPath";
import {ROUTE} from "../router";
// actions
import {createTimeoutNotification} from "../store/thunks/notifications";

interface IAdministrationFormHOC {
    label: string,
    children: ReactNode,
    wrapperFormSX?: SxProps
}
const AdministrationFormHOC: FC<IAdministrationFormHOC> = ({label, children, wrapperFormSX}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.authentication.user);
    const effectRef = useRef<boolean>(false);

    useEffect(() => {
        if(effectRef.current) return;

        if(!user || !user.isAdmin) {
            dispatch(createTimeoutNotification({
                notification: {type: "error", title: "У вас нет доступа к этому ресурсу"}
            }))
            navigate(createPath({path: ROUTE.MAIN} ));
            effectRef.current = true;
        }
    }, [user])

    return (
        <>
            <Typography variant="h1" textAlign="center">{label}</Typography>
            <Divider sx={{mb: "2rem"}} />
            <Box component="main" sx={wrapperFormSX}>
                {children}
            </Box>
        </>
    );
};

export default AdministrationFormHOC;