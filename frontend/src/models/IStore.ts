import {IProduct, IProductInCart} from "./IProduct";
import {INotifier} from "./INotifier";
import {IUserDto} from "./IUser";
import {ICategoryTree} from "./ICategoryTree";

type loadingStatus = "idle" | "loading" | "error";

// products
export interface IProducts {
    products: IProduct[],
    productLoadingStatus: loadingStatus
}

// shopping cart
export interface IShoppingCart {
    productsInCart: IProductInCart[],
    cartLoadingStatus: loadingStatus
}

// category
export interface ICategories {
    categories: ICategoryTree[],
    categoryLoadingStatus: loadingStatus
}

// filters
const filters = ["electronics", "appliances", "books",  "children's products", "sports and recreation", "зоотовары", "digital products"] as const;
type ActiveFilter = typeof filters[number];
export interface IFilters {
    filters: typeof filters,
    activeFilters: ActiveFilter[],
    filterLoadingStatus: loadingStatus
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