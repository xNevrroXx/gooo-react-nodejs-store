// types
import {TRouteArgs, TRouteWithParams} from "../models/IRoute";

export function createPath(args: TRouteArgs) {
    if(!args.hasOwnProperty("params")) return args.path;

    return Object.entries((args as TRouteWithParams).params).reduce(
        (previousValue: string, [param, value]) =>
            previousValue.replace(`:${param}`, "" + value),
        args.path
    );
}