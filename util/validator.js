import { isEmail, isLength, matches } from "validator";

const MIN_PASSWORD_LENGTH = 8;

export default {
  isValidEmail: (email) => {
    return isEmail(email);
  },

  isValidPassword: (password) => {
    return (
      // Meets minimum length
      isLength(password, { min: MIN_PASSWORD_LENGTH, max: undefined }) &&
      // Contains uppercase and lowercase letters and numbers
      matches(password, /[a-zA-Z0-9]+/)
    );
  },

  passwordMeetsMinLength: (password) =>
    isLength(password, { min: MIN_PASSWORD_LENGTH, max: undefined }),

  containsLowercase: (str) => matches(str, /[a-z]/),
  containsUppercase: (str) => matches(str, /[A-Z]/),
  containsNumbers: (str) => matches(str, /[0-9]/),
};
