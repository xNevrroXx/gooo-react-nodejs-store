// own modules
import {ROUTE} from "../router";
// types
import {IUser} from "./IUser";
import {IProduct} from "./IProduct";
import {ICategory} from "./ICategory";

export type TRouteArgs =
    | { path: ROUTE.MAIN }
    | { path: ROUTE.MAIN_WITH_FILTERS, params: { categoryId: ICategory["id"] } }

    // user
    | { path: ROUTE.USER_LOGIN }
    | { path: ROUTE.USER_REGISTRATION }
    | { path: ROUTE.USER_RECOVERY_PASSWORD_START }
    | { path: ROUTE.USER_RECOVERY_PASSWORD_FINISH, params: { recoveryLink: string } }
    | { path: ROUTE.USER_PROFILE, params: { userId: IUser["id"] } }

    // admin
    | { path: ROUTE.ADMIN_PRODUCT_CREATE }
    | { path: ROUTE.ADMIN_CATEGORY_CREATE }

    // products
    | { path: ROUTE.PRODUCT, params: { productId: IProduct["id"] } }

    // shopping cart
    | { path: ROUTE.SHOPPING_CART }
    ;

export type TRouteWithParams = {path: string, params: any}