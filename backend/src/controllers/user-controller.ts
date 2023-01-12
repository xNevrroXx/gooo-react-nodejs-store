import {Request, Response} from "express";

const userService = require("../service/user-service");
const mailService = require("../service/mail-service");

class UserController {
    async registration(request: Request, response: Response, next: () => void) {
        try {
            const {email, password, username, firstname, lastname} = request.body;
            const userData = await userService.registration(email, password, username, firstname, lastname);

            response.cookie("refreshToken", userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            response.json({
                status: 200,
                userData
            })
        }
        catch (error) {
            console.log("registration error: ", error);
        }
    }

    async login(request: Request, response: Response, next: () => void) {
        try {
            const email = request.body.email;
            const password = request.body.password;
            await userService.login(email, password);

            response.json({
                status: 200,
                message: "Добро пожаловать"
            })
        }
        catch (error) {
            console.log("login error: ", error);
        }
    }

    async logout(request: Request, response: Response, next: () => void) {
        try {

        }
        catch (error) {
            console.log("logout error: ", error);
        }
    }

    async refresh(request: Request, response: Response, next: () => void) {
        try {

        }
        catch (error) {
            console.log("refresh error: ", error);
        }
    }

    async sendRecoveryCode(request: Request, response: Response, next: () => void) {
        try {
            const email = request.body.email;
            const recoveryCode: number = await userService.createRecoveryCode(email);
            mailService.sendRecoveryMail(email, recoveryCode);
            response.json({
                message: "Сообщение отправлено на ваш почтовый адрес"
            })
        }
        catch (error) {
            console.log("recovery error: ", error);
            response.send("Произошла ошибка - попробуйте снова чуть позже, спасибо")
        }
    }

    async verifyRecoveryCode(request: Request, response: Response, next: () => void) {
        try {
            const email = request.body.email;
            const recoveryCode = request.body.recoveryCode;
            const isCorrespond = await userService.verifyRecoveryCode(email, recoveryCode);
            response.json({
                message: "Код верен"
            })
        }
        catch (error) {
            console.log("recovery error: ", error);
            response.send("Произошла ошибка - попробуйте снова чуть позже, спасибо")
        }
    }

    async getUsers(request: Request, response: Response, next: () => void) {
        try {
            const users = await userService.getUsers();

            response.json(users);
        }
        catch (error) {
            console.log("getUsers error: ", error);
            response.send("Произошла ошибка - попробуйте снова чуть позже, спасибо")
        }
    }
}

module.exports = new UserController();