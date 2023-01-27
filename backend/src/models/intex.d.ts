import {IUserPayloadJWT} from "./IUser";

declare global {
    namespace Express {
        export interface Request {
            user?: IUserPayloadJWT;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            PORT: number
            API_URL: string
            CLIENT_URL: string
            DB_DATABASE: string
            DB_USER: string
            DB_PASSWORD: string
            DB_HOST: string
            DB_PORT: string
            SMTP_HOST: string
            SMTP_PORT: number
            SMTP_EMAIL_ADDRESS: string
            SMTP_EMAIL_PASSWORD: string
            JWT_ACCESS_SECRET: string
            JWT_REFRESH_SECRET: string
        }
    }
}