import React, {FC, useMemo} from 'react';
import ReactDOM from "react-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

// own modules
import {useAppSelector} from "../../hooks/store.hook";
import Notification from "./Notification";
// types
import {INotification} from "../../models/IStore";

const NotificationList: FC = () => {
    const {notifications}: {notifications: INotification[]} = useAppSelector(state => state.notifications);

    const notificationComponents = useMemo(() => notifications.map(({id, type, title, description}) => (
        <CSSTransition key={id} classNames="notification" timeout={800} mountOnEnter={true}>
            <Notification type={type} title={title} description={description}/>
        </CSSTransition>)
    ), [notifications])

    return ReactDOM.createPortal(
        <TransitionGroup component="div" className="notification-list">
            {notificationComponents}
        </TransitionGroup>
        , document.body
    )
};

export default NotificationList;