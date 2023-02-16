import React, {FC, ReactNode, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
// own modules
import {useAppDispatch, useAppSelector} from "../hooks/store.hook";
import {createPath} from "../router/createPath";
import {ROUTE} from "../router";
// actions
import {createTimeoutNotification} from "../store/thunks/notifications";

interface IOnlyNotAuthorizedHOC {
    children: ReactNode
}
const OnlyNotAuthorizedHOC: FC<IOnlyNotAuthorizedHOC> = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
    const effectRef = useRef<boolean>(false);

    useEffect(() => {
        if(effectRef.current) return;

        if(isAuthenticated) {
            dispatch(createTimeoutNotification({
                notification: {type: "information", title: "Вы уже прошли аутентификацию", description: "Если хотите зайти под другим аккаунтом, сначала выйдете из этого"}
            }))
            navigate(createPath({path: ROUTE.MAIN}))
            effectRef.current = true;
        }
    }, [isAuthenticated])

    return (
        <>
            {children}
        </>
    );
};

export default OnlyNotAuthorizedHOC;