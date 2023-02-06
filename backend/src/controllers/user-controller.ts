import {NextFunction, Request, Response} from "express";

import {validationResult} from "express-validator";
import ApiError from "../exceptions/api-error";
import userService from "../service/user-service";
import mailService from "../service/mail-service";

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
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }

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

    async sendRecoveryLink(request: Request, response: Response, next: NextFunction) {
        try {
            const email = request.body.email;
            const recoveryCode: string = await userService.createRecoveryCode(email);
            const recoveryLink: string = process.env.CLIENT_URL + "/recovery/" + recoveryCode;
            mailService.sendRecoveryMail(email, recoveryLink);
            response.status(200).json({
                message: "Сообщение отправлено на ваш почтовый адрес"
            })
        }
        catch (error) {
            next(error);
        }
    }

    async changePassword(request: Request, response: Response, next: NextFunction) {
        try {
            const recoveryCode = request.params.code;
            const newPassword = request.body.password;
            await userService.changePassword(recoveryCode, newPassword);

            response.status(200).json({
                message: "Пароль изменен"
            })
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

export default new UserController();