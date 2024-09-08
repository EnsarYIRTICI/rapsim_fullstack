import API from "../config/API";
import HttpService from "./HttpService";

class UserInformationService {
  static async FindPopulate(token, userId) {
    return await HttpService.Get(
      API.API_USER_INFORMATIONS + `?filters[userId]=${userId}&populate=*`,
      token
    );
  }

  static async SignUp(username, email, password, name, lastname, tckn) {
    return await HttpService.Post(API.API_CUSTOM_USER_CREATE, null, {
      username,
      email,
      password,

      name,
      lastname,
      tckn: parseInt(tckn),
    });
  }
}

export default UserInformationService;
