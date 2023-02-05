import {ICategories} from "../models/IStore";

const initialState: ICategories = {
    categories: [],
    categoryLoadingStatus: "idle"
}

const categories = (state = initialState, action: {type: string, payload: any}): ICategories => {
    switch (action.type) {
        case "CATEGORIES_FETCHING":
            return {
                ...state,
                categoryLoadingStatus: "loading"
            }
        case "CATEGORIES_FETCHED":
            return {
                ...state,
                categories: [...state.categories, ...action.payload],
                categoryLoadingStatus: "idle"
            }
        case "CATEGORIES_FETCHING_ERROR":
            return {
                ...state,
                categoryLoadingStatus: "error"
            }
        case "CATEGORY_CREATE":
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case "CATEGORY_DELETE":
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            }
        default: return state;
    }
}

export default categories;