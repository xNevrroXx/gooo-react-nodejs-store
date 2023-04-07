import React, {FC, useMemo, createRef} from 'react';
import ReactDOM from "react-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
// own modules
import {useAppSelector} from "../../hooks/store.hook";
import Notification from "./Notification";
// types
import {INotification} from "../../models/IStore";

const NotificationList: FC = () => {
    const {notifications}: {notifications: INotification[]} = useAppSelector(state => state.notifications);

    const notificationComponents = useMemo(() => notifications.map(({id, type, title, description}) => {
        const nodeRef = createRef<HTMLDivElement>();
        return (
            <CSSTransition nodeRef={nodeRef} key={id} classNames="notification" timeout={800} mountOnEnter={true}>
                <Notification ref={nodeRef} type={type} title={title} description={description}/>
            </CSSTransition>
        )
    }), [notifications])

    return ReactDOM.createPortal(
        <TransitionGroup component="div" className="notification-list">
            {notificationComponents}
        </TransitionGroup>
        , document.body
    )
};

export default NotificationList;