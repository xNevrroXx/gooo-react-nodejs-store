module.exports = class UserDto{
    email;
    username;
    id;

    constructor(userModel: {id: number, username: string, password: string, firstname: string, lastname: string, email: string, created_at: string, activation_link: string}) {
        this.email = userModel.email;
        this.username = userModel.username;
        this.id = userModel.id;
    }
}