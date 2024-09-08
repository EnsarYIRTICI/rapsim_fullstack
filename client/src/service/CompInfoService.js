import API from "../config/API";
import HttpService from "./HttpService";

class CompInfoService {
  static async FindPopulate(token, userId) {
    return await HttpService.Get(
      API.API_USER_COMPANIES + `?filters[userId]=${userId}&populate=*`,
      token
    );
  }

  static async SignUp(username, email, password, name, vkn) {
    return await HttpService.Post(API.API_CUSTOM_USER_CREATE_COMPANY, null, {
      username,
      email,
      password,

      name,
      vkn: parseInt(vkn),
    });
  }
}

export default CompInfoService;
