import {IProduct, IProductInCart} from "./IProduct";
import {INotifier} from "./INotifier";
import {IUserDto} from "./IUser";
import {ICategoryTree} from "./ICategoryTree";
import {ICategory} from "./ICategory";
import {IFilter} from "./IFilter";

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
export interface IFilters {
    filters: IFilter
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