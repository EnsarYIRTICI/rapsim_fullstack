class HeaderUtil {
  static getHeader(token) {
    return token
      ? {
          Authorization: "Bearer " + token,
        }
      : {};
  }

  static postHeader(token) {
    return {
      Authorization: token ? "Bearer " + token : undefined,
      "Content-Type": "application/json",
    };
  }

  static formHeader(token) {
    return {
      Authorization: token ? "Bearer " + token : undefined,
      "Content-Type": "multipart/form-data",
    };
  }
}

export default HeaderUtil;
