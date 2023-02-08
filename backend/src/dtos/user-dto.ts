import {IUser} from "../models/IUser";

class UserDto{
    email;
    username;
    id;
    isAdmin;

    constructor(userModel: IUser) {
        this.email = userModel.email;
        this.username = userModel.username;
        this.id = userModel.id;
        this.isAdmin = userModel.isAdmin;
    }
}

export default UserDto;