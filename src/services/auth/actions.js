import { createActions } from "redux-actions";

const { auth } = createActions({
  AUTH: {
    LOGIN: (user) => user,
    LOGIN_RESPONSE: (token) => token,
    LOGIN_RESPONSE_MIGRATED: (user) => ({ user }),
    LOGIN_RESPONSE_PASSWORD_REQUIRED: () => ({}),

    SIGNUP: (user) => user,
    SIGNUP_RESPONSE: (token) => token,

    IS_LOGGED: () => ({}),
    SET_LOGGED: (authProp) => ({ auth: authProp }),

    LOGOUT: () => ({}),
    LOGOUT_RESPONSE: () => ({}),

    FORGOT_PASSWORD: (email) => email,
    FORGOT_PASSWORD_RESPONSE: () => ({}),

    VERIFY_CODE: (code) => code,
    VERIFY_CODE_RESPONSE: (code) => code,

    VERIFY_EMAIL: (email) => email,
    VERIFY_EMAIL_RESPONSE: () => ({}),

    CHANGE_FORGOT_PASSWORD: (password) => password,
    CHANGE_FORGOT_PASSWORD_RESPONSE: () => ({}),

    SET_TOKEN: (token) => ({ token }),
    SET_TOKEN_RESPONSE: () => ({}),

    CANCEL_FORGOT_PASSWORD: () => ({}),

    CLEAR_LOGIN_PROCESS: () => ({}),

    CLEAR_MIGRATED: () => ({}),

    UPDATE_PASSWORD: (passwordData) => passwordData,
    UPDATE_PASSWORD_RESPONSE: () => ({}),
    CLEAR_UPDATE_PASSWORD: () => ({}),
  },
});

export default auth;
