export interface IUserDto {
    id: number,
    email: string,
    username: string
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