import {Response, NextFunction} from "express";
import {IAuthRequestInfoUser} from "../types";

const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (request: IAuthRequestInfoUser, response: Response, next: NextFunction) {
    try {
        const accessToken = request.headers.authorization?.split(" ")[1];
        if(!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        request.user = userData;
        next();
    }
    catch (error) {
        return next(ApiError.UnauthorizedError());
    }
};