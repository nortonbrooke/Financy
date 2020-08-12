export const RESTORE_USER = "RESTORE_USER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const authInitialState = {
  isCheckingAuth: true,
  isSignedOut: false,
  userToken: null,
  userNotFound: false,
  passwordInvalid: false,
};

export default function authReducer(prevState, action) {
  switch (action.type) {
    case RESTORE_USER:
      return {
        ...prevState,
        userToken: action.userToken,
        isCheckingAuth: false,
      };
    case SIGN_IN:
      return {
        ...prevState,
        isSignedOut: false,
        userToken: action.userToken,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        isSignedOut: true,
        userToken: null,
      };
  }
}
