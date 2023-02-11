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
import {IUserRegistration} from "../models/IUser";

class UserService {
    async registration({
                            email,
                            password,
                            username,
                            firstname,
                            lastname,
                            location,
                            isAdmin
                       }: IUserRegistration) {
        const foundUser = await userActions.findUser({email});
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
            createdAt: timestamp,
            location,
            isAdmin
        });
        const user = await userActions.findUser({email: email});
        await activationActions.createActivationData({userId: user.id, activationLink, createdAt: timestamp , isActivated: 0});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
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
            throw ApiError.BadRequest("Код восстановления неверен");
        }
        const {createdAt, userId, isUsed} = recoveryActions.normalized(foundRecoveryData);
        const timezoneOffsetMs = 1000 * 60 * ( new Date().getTimezoneOffset() < 0 ? -new Date().getTimezoneOffset() : new Date().getTimezoneOffset() );
        if(isUsed === 1) {
            throw ApiError.BadRequest("Код восстановления уже был использован. Если Вы не изменяли пароль - обратитесь в центр поддержки.")
        }
        else if( ( new Date(createdAt).getTime() + timezoneOffsetMs + 1000*60*10 ) < Date.now()) { // if more than 10 minutes ago
            throw ApiError.BadRequest("Истек срок действия кода восстановления");
        }
        const foundUser = await userActions.findUser({id: userId});
        const hashPassword = await bcrypt.hash(newPassword, 3);
        await customQuery(`UPDATE user SET password = "${hashPassword}" WHERE id = "${foundUser.id}"`);
        try {
            await customQuery(`UPDATE user_recovery_code SET is_used=1 WHERE user_id = "${foundUser.id}"`);
        }
        catch (error) {
            console.log("Not able to change IS_USED field in the mysql table.");
        }
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