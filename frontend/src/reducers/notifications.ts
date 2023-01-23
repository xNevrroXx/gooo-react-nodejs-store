import {INotifications} from "../models/IStore";

const initialState: INotifications = {
    notifications: []
}

function notifications(state = initialState, action: {type: string, payload: any}): INotifications {
    switch (action.type) {
        case "CREATE_NOTIFICATION":
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            }
        case "DELETE_NOTIFICATION":
            return {
                ...state,
                notifications: state.notifications.filter(notification => notification.id !== action.payload)
            }
        default: return state
    }
}

export default notifications;