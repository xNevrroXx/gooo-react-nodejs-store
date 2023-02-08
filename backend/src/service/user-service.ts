import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import recoveryActions from "../database/recovery-actions";
import mailService from "./mail-service";
import tokenService from "./token-service";
import userActions from "../database/user-actions";
import UserDto from "../dtos/user-dto";
import customQuery from "../database/custom-query";
import activationActions from "../database/activation-actions";
import tokenActions from "../database/token-actions";
import ApiError from "../exceptions/api-error";

class UserService {
    async registration(email: string, password: string, username: string, firstname: string, lastname: string) {
        const foundUser = await userActions.findUser({email});
        console.log("found user: ", foundUser);
        if(foundUser) {
            throw ApiError.Conflict(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        await userActions.createUser({
            email,
            password: hashPassword,
            username,
            firstname,
            lastname,
            createdAt: timestamp
        });
        const user = await userActions.findUser({email: email});
        await activationActions.createActivationData({userId: user.id, activationLink, createdAt: timestamp , isActivated: 0});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink: string) {
        const foundActivationData = await activationActions.findActivationData({activationLink});
        if (!foundActivationData) {
            throw ApiError.BadRequest("Некорректная ссылка активации");
        }
        const normalizedActivationData = activationActions.normalization(foundActivationData);
        await activationActions.activateUser(normalizedActivationData.userId);
    }

    async login(email: string, password: string) {
        const foundUser = await userActions.findUser({email});
        if(!foundUser) {
            throw ApiError.BadRequest(`Пользователя с почтовым адресом ${email} не существует`);
        }
        const isPasswordEqual = await bcrypt.compare(password, foundUser.password);
        if(!isPasswordEqual) {
            throw ApiError.BadRequest("Пароль неверный");
        }
        const userDto = new UserDto(foundUser);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const isExistInDb = await tokenActions.isExistToken({token: refreshToken});
        if(!userData || !isExistInDb) {
            throw ApiError.UnauthorizedError();
        }
        const actualUserData = await userActions.findUser({id: userData.id});
        const userDto = new UserDto(actualUserData);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async createRecoveryCode(email: string): Promise<string> {
        const foundUser = await userActions.findUser({email});
        if(!foundUser) {
            throw ApiError.BadRequest(`Пользователя с почтовым адресом ${email} не существует`);
        }
        const recoveryCode = uuidv4();
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        await recoveryActions.create({userId: foundUser.id, value: recoveryCode, createdAt: timestamp});
        return recoveryCode;
    }

    async changePassword(recoveryCode: string, newPassword: string) {
        const foundRecoveryData = await recoveryActions.findOne({value: recoveryCode});
        if(!foundRecoveryData) {
            throw ApiError.BadRequest("Код неверен");
        }
        const normalizedRecoveryData = recoveryActions.normalized(foundRecoveryData);
        console.log("normalized data: ", normalizedRecoveryData);
        const foundUser = await userActions.findUser({id: normalizedRecoveryData.userId});
        console.log("foundUser: ", foundUser);
        const hashPassword = await bcrypt.hash(newPassword, 3);
        await customQuery(`UPDATE user SET password = "${hashPassword}" WHERE id = "${foundUser.id}"`);
    }

    async getUsers(): Promise<any[]> {
        const allUsers = await userActions.findAllUsers();
        return allUsers.map((user) => {
                const obj: any = {...user};
                delete obj.password;
                return obj;
            }
        );
    }
}

export default new UserService();