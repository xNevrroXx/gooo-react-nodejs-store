import {Request, Response, NextFunction} from "express";

import ApiError from "../exceptions/api-error";
import tokenService from "../service/token-service";

function authMiddleware (request: Request, response: Response, next: NextFunction) {
    try {
        const accessToken = request.headers.authorization?.split(" ")[1];
        if(!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.UnauthorizedError());
        }
        request.user = userData;
        next();
    }
    catch (error) {
        return next(ApiError.UnauthorizedError());
    }
};

export default authMiddleware;