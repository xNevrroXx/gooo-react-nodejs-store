import {IUserDto} from "../IUser";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUserDto
}