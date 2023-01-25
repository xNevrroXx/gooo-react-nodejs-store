const jwt = require("jsonwebtoken");
const tokenActions = require("../database/token-actions");

class TokenService {
    generateTokens(payload: {email: string, id: number, username: string}) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
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

module.exports = new TokenService();