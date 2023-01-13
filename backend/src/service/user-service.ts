import {response} from "express";
import {create} from "domain";

const bcrypt = require("bcrypt");
const {v4: uuidv4} = require("uuid");
const recoveryCodeActions = require("../database/recovery-code-actions");
const userActions = require("../database/user-actions");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const customQuery = require("../database/custom-query");
const activationActions = require("../database/activation-actions");

class UserService {
    async registration(email: string, password: string, username: string, firstname: string, lastname: string) {
        const foundUser = await userActions.findUser({email});
        if(foundUser.length > 0) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        const creationUser = await userActions.createUser({
            email,
            password: hashPassword,
            username,
            firstname,
            lastname,
            timestamp
        });
        const user = await userActions.findUser({email: email, id: null});
        await activationActions.createActivationData(user[0].id, activationLink, timestamp);
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user[0]);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink: string) {
        const foundActivationData = await activationActions.findActivationData({activationLink, userId: null});
        if (foundActivationData.length === 0) {
            throw new Error("Некорректная ссылка активации");
        }
        await activationActions.activateUser(foundActivationData[0]["user_id"]);
    }

    async login(email: string, password: string) {
        const foundUser = await userActions.findUser({email});
        if(foundUser.length == 0) {
            throw new Error(`Пользователя с почтовым адресом ${email} не существует`);
        }
        const isComparePassword = await bcrypt.compare(password, foundUser[0].password);
        if(!isComparePassword) {
            throw new Error("Пароль неверный");
        }
    }

    async createRecoveryCode(email: string): Promise<number> {
        const foundUser = await userActions.findUser({email});
        if(foundUser.length == 0) {
            throw new Error(`Пользователя с почтовым адресом ${email} не существует`);
        }
        const recoveryCode = Math.floor(Math.random()*(1e6-1e5))+1e5;
        const creationCode = await recoveryCodeActions.create(foundUser[0].id, recoveryCode);
        return recoveryCode;
    }

    async verifyRecoveryCode(email: string, recoveryCode: string | number): Promise<boolean> {
        const foundUser = await userActions.findUser({email});
        if(foundUser.length == 0) {
            throw new Error(`Пользователя с почтовым адресом ${email} не существует`);
        }
        const foundRecoveryCode = await recoveryCodeActions.find(foundUser[0].id);
        if(foundRecoveryCode.length == 0 || foundRecoveryCode[0].value != recoveryCode) {
            throw new Error("Код неверен");
        }
        return recoveryCode == foundRecoveryCode[0].value;
    }

    async getUsers(): Promise<any[]> {
        const allUsers = await userActions.findAllUsers();
        return allUsers.map((result: {"email": string}) => result.email);
    }
}

module.exports = new UserService();