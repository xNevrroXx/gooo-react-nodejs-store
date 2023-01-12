const jwt = require("jsonwebtoken");
const tokenActions = require("../database/token-actions");

class TokenService {
    generateTokens(payload: {email: string, id: number, isActivated: string}) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "30m"});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: "30d"});
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        await tokenActions.saveToken(userId, refreshToken, timestamp);
    }
}

module.exports = new TokenService();