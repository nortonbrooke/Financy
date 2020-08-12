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
      // Has upper and lowercase capital letters
      matches(password, /[^A-Z][^a-z]/)
    );
  },
};
