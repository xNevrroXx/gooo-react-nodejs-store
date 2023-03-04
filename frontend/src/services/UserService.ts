import {AxiosResponse} from "axios";
// own modules
import $api from "../http";

class UserService {
    private static base = "/user/all";
    static async getUsers(): Promise<AxiosResponse<string[]>> {
        return $api.get<string[]>(this.base + "/");
    }
}

export default UserService;