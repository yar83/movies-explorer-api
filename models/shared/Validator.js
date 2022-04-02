class Validator {
  static validateURL(url) {
    if (!url) return false;
    const regex = /^(htt(ps|p):\/\/)(www\.)?([-\w+_~]+\.)+\w{2,}(\/?.*)*$/i;
    return regex.test(url);
  }

  static validateEmail(email) {
    if (!email) return false;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\.[\d]{1,3}\])|(([\w-]+\.)+[a-zA-Z]{2,}))$/i;
    return regex.test(email);
  }
}

module.exports = Validator;
