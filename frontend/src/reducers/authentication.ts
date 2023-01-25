import {IAuthentication} from "../models/IStore";

const initialState: IAuthentication = {
    user: null,
    isAuthenticated: false
}

const authentication = (state = initialState, action: {type: string, payload: any}): IAuthentication => {
    switch (action.type) {
        case "SET_AUTHENTICATION":
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        default: return state;
    }
}

export default authentication;