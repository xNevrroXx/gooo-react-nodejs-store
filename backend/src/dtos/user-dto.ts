import {IUser} from "../models/IUser";

class UserDto{
    email;
    username;
    id;

    constructor(userModel: IUser) {
        this.email = userModel.email;
        this.username = userModel.username;
        this.id = userModel.id;
    }
}

export default UserDto;