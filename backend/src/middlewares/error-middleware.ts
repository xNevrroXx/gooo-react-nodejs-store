import {NextFunction, Request, Response} from "express";

import ApiError from "../exceptions/api-error";

export default function (error: Error | typeof ApiError, request: Request, response: Response, next: NextFunction) {
    console.log("error middleware: ", error);

    if(error instanceof ApiError) {
        return response.status(error.status).json({message: error.message, errors: error.errors})
    }
    return response.status(500).json({message: "Непредвиденная ошибка"});
}