import {IFilters} from "../models/IStore";

const initialState: IFilters = {
    filters: ["electronics", "appliances", "books",  "children's products", "sports and recreation", "зоотовары", "digital goods"],
    activeFilters: [],
    filterLoadingStatus: "idle"
}

const filters = (state = initialState, action: {type: string, payload: any}): IFilters => {
    switch (action.type) {
        case "FILTER_FETCHING":
            return {
                ...state,
                filterLoadingStatus: "loading"
            }
        case "FILTER_FETCHED":
            return {
                ...state,
                filters: action.payload,
                filterLoadingStatus: "idle"
            }
        case "FILTER_FETCHING_ERROR":
            return {
                ...state,
                filterLoadingStatus: "error"
            }
        case "ACTIVE_FILTER_CHANGE":
            return {
                ...state,
                activeFilters: action.payload
            }
        default: return state
    }
}

export default filters;