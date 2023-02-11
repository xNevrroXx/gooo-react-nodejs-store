// own modules
import {ROUTE} from "../router";
// types
import {IUser} from "./IUser";
import {IProduct} from "./IProduct";

export type TRouteArgs =
    | { path: ROUTE.MAIN }
    | { path: ROUTE.USER_LOGIN }
    | { path: ROUTE.USER_REGISTRATION }
    | { path: ROUTE.USER_RECOVERY_PASSWORD_START }
    | { path: ROUTE.USER_RECOVERY_PASSWORD_FINISH, params: { recoveryLink: string } }
    | { path: ROUTE.USER_PROFILE, params: { userId: IUser["id"] } }
    | { path: ROUTE.ADMIN_LOGIN }
    | { path: ROUTE.ADMIN_PRODUCT_CREATE }
    | { path: ROUTE.ADMIN_CATEGORY_CREATE }
    | { path: ROUTE.PRODUCT, params: { productId: IProduct["id"] } }

export type TRouteWithParams = {path: string, params: any}