import {IGoods} from "../models/IStore";

const initialState: IGoods = {
    goods: [],
    goodsLoadingStatus: "idle"
}

const goods = (state: IGoods = initialState, action: {type: string, payload: any}): IGoods => {
    switch (action.type) {
        case "GOODS_FETCHING":
            return {
                ...state,
                goodsLoadingStatus: "loading"
            }
        case "GOODS_FETCHED":
            return {
                ...state,
                goods: action.payload,
                goodsLoadingStatus: "idle"
            }
        case "GOODS_FETCHING_ERROR":
            return {
                ...state,
                goodsLoadingStatus: "error"
            }
        default: return state
    }
}

export default goods;