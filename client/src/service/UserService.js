import API from "../config/API";
import HttpService from "./HttpService";

class UserService {
  static async UpdateRole(token, userId, roleId) {
    return await HttpService.Put(
      API.API_USERS + `/${userId}/` + API.POPULATE,
      token,
      {
        role: roleId,
      }
    );
  }

  static async Me(token) {
    return await HttpService.Get(API.API_USERS_ME, token);
  }

  static async MePopulate(token) {
    return await HttpService.Get(API.API_USERS_ME + API.POPULATE, token);
  }
}

export default UserService;
