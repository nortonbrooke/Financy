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
      matches(password, /[^A-Z][^a-z][^0-9]/)
    );
  },

  passwordMeetsMinLength: (password) =>
    isLength(password, { min: MIN_PASSWORD_LENGTH, max: undefined }),

  containsUppercase: (str) => matches(str, /[A-Z]/),
  containsLowercase: (str) => matches(str, /[a-z]/),
  containsNumbers: (str) => matches(str, /[0-9]/),
};
