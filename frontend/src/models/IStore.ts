import {IProduct} from "./IProduct";

export interface IGoods {
    goods: IProduct[],
    goodsLoadingStatus: "idle" | "loading" | "error"
}

const filters = ["electronics", "appliances", "books",  "children's products", "sports and recreation", "зоотовары", "digital goods"] as const;
type ActiveFilter = typeof filters[number];

export interface IFilters {
    filters: typeof filters,
    activeFilters: ActiveFilter[],
    filterLoadingStatus: "idle" | "loading" | "error"
}


type filter = IFilters["filters"];