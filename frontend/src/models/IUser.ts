export interface IUserDto {
    id: IUser["id"],
    email: IUser["email"],
    username: IUser["username"],
    isAdmin: IUser["isAdmin"]
}


export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserRegistration extends IUserLogin{
    username: string,
    firstname: string,
    lastname: string,
    location: string,
    isAdmin: 0 | 1
}

export interface IUser extends IUserRegistration {
    createdAt: string,
    id: number
}