import {NextFunction, Request, Response} from "express";

const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");
const mailService = require("../service/mail-service");

class UserController {
    async registration(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }
            const {email, password, username, firstname, lastname} = request.body;
            const userData = await userService.registration(email, password, username, firstname, lastname);

            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            response.status(200).json(userData)
        }
        catch (error) {
            next(error);
        }
    }

    async activate(request: Request, response: Response, next: NextFunction) {
        try {
            const activationLink = request.params.link;
            await userService.activate(activationLink);

            response.status(300).redirect(process.env.CLIENT_URL || "");
        }
        catch (error) {
            next(error);
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const {email, password} = request.body;
            const userData = await userService.login(email, password);

            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            response.status(200).json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const {refreshToken} = request.cookies;
            response.clearCookie("refreshToken");
            response.sendStatus(205);
        }
        catch (error) {
            next(error);
        }
    }

    async refresh(request: Request, response: Response, next: NextFunction) {
        try {
            const {refreshToken} = request.cookies;
            const userData = await userService.refresh(refreshToken);

            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            response.status(200).json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async sendRecoveryCode(request: Request, response: Response, next: NextFunction) {
        try {
            const email = request.body.email;
            const recoveryCode: number = await userService.createRecoveryCode(email);
            // todo send not code and url of the recovery page. Create table for this urls;
            mailService.sendRecoveryMail(email, recoveryCode);
            response.status(200).json({
                message: "Сообщение отправлено на ваш почтовый адрес"
            })
        }
        catch (error) {
            next(error);
        }
    }

    async verifyRecoveryCode(request: Request, response: Response, next: NextFunction) {
        try {
            // todo change this endpoint to the getting password and repeat password. Add one param to the URL.
            const email = request.body.email;
            const recoveryCode = request.body.recoveryCode;
            await userService.verifyRecoveryCode(email, recoveryCode);

            response.status(200).json({
                message: "Код верен"
            })
        }
        catch (error) {
            next(error);
        }
    }

    async recoveryCreateNewPassword(request: Request, response: Response, next: NextFunction) {
        try {
            const {email, }
        }
        catch (error) {
            next(error);
        }
    }

    async getUsers(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();

            response.json(users);
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();