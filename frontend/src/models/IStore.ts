import {IProduct} from "./IProduct";
import {INotifier} from "./INotifier";
import {IUserDto} from "./IUser";
import {ICategory} from "./ICategory";
import {ICategoryTree} from "./ICategoryTree";

// products
export interface IProducts {
    products: IProduct[],
    productLoadingStatus: "idle" | "loading" | "error"
}

// category
export interface ICategories {
    categories: ICategoryTree[],
    categoryLoadingStatus: "idle" | "loading" | "error"
}

// filters
const filters = ["electronics", "appliances", "books",  "children's products", "sports and recreation", "зоотовары", "digital products"] as const;
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

// authentication
export interface IAuthentication {
    user: IUserDto | null,
    isAuthenticated: boolean
}