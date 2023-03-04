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

            const {email, password, username, firstname, lastname, location, isAdmin} = request.body;
            const userData = await userService.registration({email,password,username,firstname,lastname,location,isAdmin});

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

            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, sameSite: "strict"});
            response.status(200).json(userData);
        }
        catch (error) {
            next(error);
        }
    }

    async logout(request: Request, response: Response, next: NextFunction) {
        try {
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

            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true, sameSite: "strict"});
            response.status(200).json(userData);
        }
        catch (error) {
            response.clearCookie("refreshToken");
            next(error);
        }
    }

    async sendRecoveryLink(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }

            const email = request.body.email;
            const recoveryCode = await userService.createRecoveryCode(email);
            const recoveryLink = process.env.CLIENT_URL + "/user/recovery/" + recoveryCode;
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

    async getProductsFromCart(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.user!;
            const products = await userService.getProductsFromCart(user.id);

            response.json({
                products: products
            })
        }
        catch (error) {
            next(error);
        }
    };

    async addProductToCart(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.user!;
            const productId = request.params.productId;
            const product = await userService.addProductToCart(user.id, +productId);

            response.json({
                product
            });
        }
        catch (error) {
            next(error);
        }
    }

    async changeSelect(request: Request, response: Response, next: NextFunction) {
        try {
            const errors = validationResult(request);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }

            const isSelected = request.body.isSelected;
            const user = request.user!;
            const productId = request.params.productId;
            await userService.changeSelect(user.id, +productId, isSelected);

            response.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }

    async reduceQuantity(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.user!;
            const productId = request.params.productId;
            await userService.reduceQuantity(user.id, +productId);

            response.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }

    async deleteProductFromCart(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.user!;
            const productId = request.params.productId
            await userService.deleteProductFromCart(user.id, +productId);

            response.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    };
}

export default new UserController();