import jwt from "jsonwebtoken";
import tokenActions from "../database/token-actions";
import dotenv from "dotenv";
import {IUserPayloadJWT} from "../models/IUser";

dotenv.config();

class TokenService {
    generateTokens(payload: IUserPayloadJWT) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string): IUserPayloadJWT | null {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return <IUserPayloadJWT>userData;
        }
        catch {
            return null;
        }
    }

    validateRefreshToken(token: string): IUserPayloadJWT | null {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return <IUserPayloadJWT>userData;
        }
        catch {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        await tokenActions.saveToken(userId, refreshToken, timestamp);
    }
}

export default new TokenService();