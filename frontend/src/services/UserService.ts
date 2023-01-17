import {AxiosResponse} from "axios";
import $api from "../http";

class UserService {
    async getUsers(): Promise<AxiosResponse<string[]>> {
        return $api.get<string[]>("/users");
    }
}

export default UserService;