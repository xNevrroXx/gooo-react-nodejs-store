import React, {FC, ReactNode, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {createPath} from "../router/createPath";
import {ROUTE} from "../router";
// actions
import {createTimeoutNotification} from "../store/thunks/notifications";

interface IOnlyAuthorizedHOC {
    children: ReactNode
}
const OnlyAuthorizedHOC: FC<IOnlyAuthorizedHOC> = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const effectRef = useRef<boolean>(false);

    useEffect(() => {
        if(effectRef.current) return;

        if(!isAuthenticated) {
            dispatch(createTimeoutNotification({
                notification: {type: "error", title: "Вы не прошли аутентификацию"}
            }))
            navigate(createPath({path: ROUTE.USER_LOGIN}))
            effectRef.current = true;
        }
    }, [isAuthenticated])

    return (
        <>
            {children}
        </>
    );
};

export default OnlyAuthorizedHOC;