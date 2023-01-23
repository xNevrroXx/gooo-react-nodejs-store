import {IProduct} from "./IProduct";
import {INotifier} from "./INotifier";

// goods
export interface IGoods {
    goods: IProduct[],
    goodsLoadingStatus: "idle" | "loading" | "error"
}


// filters
const filters = ["electronics", "appliances", "books",  "children's products", "sports and recreation", "зоотовары", "digital goods"] as const;
type ActiveFilter = typeof filters[number];
export interface IFilters {
    filters: typeof filters,
    activeFilters: ActiveFilter[],
    filterLoadingStatus: "idle" | "loading" | "error"
}

// notifications
export interface INotification extends INotifier {
    id: string;
}
export interface INotifications {
    notifications: INotification[]
}