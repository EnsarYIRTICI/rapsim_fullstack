class API {
  static HTTP = "http://";
  static HTTPS = "https://";

  static PROTOCOL = API.HTTP;
  static HOST = "localhost";
  static PORT = 1337;

  static URL_SERVER = API.PROTOCOL + API.HOST + ":" + API.PORT;

  static API_TURKIYE_CITIES = "https://turkiyeapi.dev/api/v1/provinces";

  static POPULATE = "?populate=*";

  static API_AUTH_LOCAL = API.URL_SERVER + "/api/auth/local";
  static API_AUTH_LOCAL_REGISTER = API.URL_SERVER + "/api/auth/local/register";
  static API_AUTH_CHANGE_PASSWORD =
    API.URL_SERVER + "/api/auth/change-password";

  static API_USERS = API.URL_SERVER + "/api/users";
  static API_USERS_ME = API.URL_SERVER + "/api/users/me";

  static API_USER_INFORMATIONS = API.URL_SERVER + `/api/user-informations`;
  static API_USER_COMPANIES =
    API.URL_SERVER + `/api/user-information-companies`;
  static API_USER_ORGANISATIONS =
    API.URL_SERVER + `/api/user-information-organisations`;

  static API_CUSTOM_USER_CREATE = API.URL_SERVER + "/api/custom/user/create";
  static API_CUSTOM_USER_CREATE_ORGANISATION =
    API.URL_SERVER + "/api/custom/user/create/organisation";
  static API_CUSTOM_USER_CREATE_COMPANY =
    API.URL_SERVER + "/api/custom/user/create/company";
}

export default API;
