module.exports = class UserDto{
    email;
    id;
    isActivated;

    constructor(userModel: {id: number, username: string, password: string, firstname: string, lastname: string, email: string, created_at: string, activation_link: string, is_activated: string}) {
        this.email = userModel.email;
        this.id = userModel.id;
        this.isActivated = userModel.is_activated;
    }
}