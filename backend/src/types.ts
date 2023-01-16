import { Request } from "express"
export interface IAuthRequestInfoUser extends Request {
    user: {
        id: number,
        email: string,
        isAuthorized: number
    }
}