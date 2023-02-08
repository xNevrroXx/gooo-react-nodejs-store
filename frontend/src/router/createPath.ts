// types
import {TRouteArgs, TRouteWithParams} from "../models/IRoute";

export function createPath(args: TRouteArgs) {
    if(args.hasOwnProperty("params") === false) return args.path;

    console.log("entries: ", Object.entries((args as TRouteWithParams).params));
    return Object.entries((args as TRouteWithParams).params).reduce(
        (previousValue: string, [param, value]) =>
            previousValue.replace(`:${param}`, "" + value),
        args.path
    );
}