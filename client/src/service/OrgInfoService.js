import API from "../config/API";
import HttpService from "./HttpService";

class OrgInfoService {
  static async FindPopulate(token, userId) {
    return await HttpService.Get(
      API.API_USER_ORGANISATIONS + `?filters[userId]=${userId}&populate=*`,
      token
    );
  }

  static async SignUp(username, email, password, name, lastname, tckn) {
    return await HttpService.Post(
      API.API_CUSTOM_USER_CREATE_ORGANISATION,
      null,
      {
        username,
        email,
        password,

        name,
        lastname,
        tckn: parseInt(tckn),
      }
    );
  }
}

export default OrgInfoService;
