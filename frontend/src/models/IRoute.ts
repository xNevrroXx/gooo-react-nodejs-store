// own modules
import {ROUTE} from "../router";
// types
import {IUserDto} from "./IUser";
import {IProduct} from "./IProduct";

export type TRouteArgs =
    | { path: ROUTE.MAIN }
    | { path: ROUTE.USER_LOGIN }
    | { path: ROUTE.USER_REGISTRATION }
    | { path: ROUTE.USER_PROFILE, params: { userId: IUserDto["id"] } }
    | { path: ROUTE.ADMIN_LOGIN }
    | { path: ROUTE.ADMIN_PRODUCT_CREATE }
    | { path: ROUTE.ADMIN_CATEGORY_CREATE }
    | { path: ROUTE.PRODUCT, params: { productId: IProduct["id"] } }

export type TRouteWithParams = {path: string, params: any}