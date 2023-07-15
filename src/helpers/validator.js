class Validator {
  static allFieldsPresentForRegisteration(data) {
    if (data.hasOwnProperty("fullName") && data.hasOwnProperty("password") && data.hasOwnProperty("email")) {
      return true;
    } else return false;
  }

  static validateEmail(email) {
    if (!/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/.test(String(email))) {
      return false;
    }
    return true;
  }

  static validateRole(role) {
    if (role == "admin" || role == "user") return true;
    else return false;
  }
}

module.exports = Validator;
