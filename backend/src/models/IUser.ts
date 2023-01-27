export interface IUserPayloadJWT {
    id: number,
    email: string,
    username: string
}

export interface IUserRegistration {
    email: string,
    password: string,
    username: string,
    firstname: string,
    lastname: string
}

export interface IUserCreation extends IUserRegistration {
    createdAt: string
}

export interface IUser extends IUserCreation{
    id: number
}