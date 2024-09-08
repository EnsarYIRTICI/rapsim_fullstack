class Validation {
  static ClearText(value) {
    return value.trim().replace(/\s+/g, " ");
  }

  static Password(password) {
    return password && password.length >= 6;
  }

  static Username(username) {
    return username && username.length >= 8;
  }

  static NullOrEmpty(value) {
    return value && value.length >= 1;
  }

  static Email(email) {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  static TCKN(tckn) {
    return /^\d{11}$/.test(tckn);
  }
}

export default Validation;
