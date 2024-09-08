import API from "../config/API";
import HttpService from "./HttpService";

class AuthService {
  static async SignIn(identifier, password) {
    return await HttpService.Post(API.API_AUTH_LOCAL, null, {
      identifier,
      password,
    });
  }

  static async SignUp(email, username, password) {
    return await HttpService.Post(API.API_AUTH_LOCAL_REGISTER, null, {
      email,
      username,
      password,
    });
  }

  static async ChangePassword(
    token,
    currentPassword,
    password,
    passwordConfirmation
  ) {
    return await HttpService.Post(API.API_AUTH_CHANGE_PASSWORD, token, {
      currentPassword,
      password,
      passwordConfirmation,
    });
  }
}

export default AuthService;
