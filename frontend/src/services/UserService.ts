import {AxiosResponse} from "axios";
import $api from "../http";

class UserService {
    private static base = "/user";
    static async getUsers(): Promise<AxiosResponse<string[]>> {
        return $api.get<string[]>(this.base + "/");
    }
}

export default UserService;