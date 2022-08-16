import { handleActions } from "redux-actions";
import * as TokenStorage from "../../common/storage/Token";

export const INITIAL_STATE = {
  isLogged: TokenStorage.isToken(),
  loading: {
    login: false,
    forgotPassword: false,
    logout: false,
    signup: false,
    setToken: false,
    changeForgotPassword: false,
    emailVerification: false,
    codeVerification: false,
    updatedPassword: false,
  },
  token: TokenStorage.get(),
  profile: TokenStorage.decodeToken() || { agent: {} },
  error: {
    login: undefined,
    forgotPassword: undefined,
    signup: undefined,
    setToken: false,
    changeForgotPassword: undefined,
    emailVerification: undefined,
    codeVerification: undefined,
    updatedPassword: undefined,
  },
  success: {
    login: undefined,
    signup: undefined,
    setToken: false,
    forgotPassword: undefined,
    changeForgotPassword: undefined,
    emailVerification: undefined,
    codeVerification: undefined,
    isMigrated: undefined,
    migratedInfo: undefined,
    updatedPassword: undefined,
    passwordRequired: false,
  },
};

const reducer = handleActions(
  {
    AUTH: {
      LOGIN: (state) => ({
        ...state,
        loading: { ...state.loading, login: true },
        error: { ...state.error, login: undefined },
      }),
      LOGIN_RESPONSE: {
        next(state, { payload: { token, profile } }) {
          return {
            ...state,
            token,
            profile,
            isLogged: true,
            loading: { ...state.loading, login: false },
            success: { login: true },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, login: message },
            success: { ...state.success, login: undefined },
            loading: { ...state.loading, login: false },
          };
        },
      },
      LOGIN_RESPONSE_MIGRATED: {
        next(state, { payload: { user } }) {
          return {
            ...state,
            loading: { ...state.loading, login: false },
            success: {
              ...state.success,
              isMigrated: true,
              migratedInfo: user.user,
            },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, login: message },
            success: { ...state.success, login: undefined },
            loading: { ...state.loading, login: false },
          };
        },
      },

      LOGIN_RESPONSE_PASSWORD_REQUIRED: {
        next(state) {
          return {
            ...state,
            loading: { ...state.loading, login: false },
            success: {
              ...state.success,
              passwordRequired: true,
            },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, login: message },
            success: { ...state.success, login: undefined },
            loading: { ...state.loading, login: false },
          };
        },
      },

      LOGOUT: (state) => ({
        ...state,
        loading: { ...state.loading, logout: true },
      }),
      LOGOUT_RESPONSE: {
        next() {
          return {
            ...INITIAL_STATE,
            token: undefined,
            profile: undefined,
            isLogged: false,
          };
        },
      },

      SIGNUP: (state) => ({
        ...state,
        loading: { ...state.loading, signup: true },
        error: { ...state.error, signup: undefined },
      }),
      SIGNUP_RESPONSE: {
        next(state, { payload: { token, profile } }) {
          return {
            ...state,
            token,
            profile,
            isLogged: true,
            loading: { ...state.loading, signup: false },
            success: { signup: true },
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, signup: message },
            success: { ...state.success, signup: undefined },
            loading: { ...state.loading, signup: false },
          };
        },
      },

      SET_LOGGED: (state, { payload: { auth } }) => ({
        ...state,
        isLogged: auth || false,
      }),

      FORGOT_PASSWORD: (state) => ({
        ...state,
        loading: { ...state.loading, forgotPassword: true },
        error: { ...state.error, forgotPassword: undefined },
        success: { ...state.success, forgotPassword: undefined },
      }),
      FORGOT_PASSWORD_RESPONSE: {
        next(state) {
          return {
            ...state,
            loading: { ...state.loading, forgotPassword: false },
            success: { forgotPassword: true },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, forgotPassword: message },
            success: { ...state.success, forgotPassword: undefined },
            loading: { ...state.loading, forgotPassword: false },
          };
        },
      },

      UPDATE_PASSWORD: (state) => ({
        ...state,
        loading: { ...state.loading, updatedPassword: true },
        error: { ...state.error, updatedPassword: undefined },
        success: { ...state.success, updatedPassword: undefined },
      }),
      UPDATE_PASSWORD_RESPONSE: {
        next(state) {
          return {
            ...state,
            loading: { ...state.loading, updatedPassword: false },
            success: { ...state.success, updatedPassword: true },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, updatedPassword: message },
            success: { ...state.success, updatedPassword: undefined },
            loading: { ...state.loading, updatedPassword: false },
          };
        },
      },
      CLEAR_UPDATE_PASSWORD: (state) => ({
        ...state,
        success: { ...state.success, updatedPassword: undefined },
        error: { ...state.error, updatedPassword: undefined },
      }),

      VERIFY_CODE: (state) => ({
        ...state,
        loading: { ...state.loading, codeVerification: true },
        error: { ...state.error, codeVerification: undefined },
        success: { ...state.success, codeVerification: undefined },
      }),
      VERIFY_CODE_RESPONSE: {
        next(state, { payload: { code } }) {
          return {
            ...state,
            loading: { ...state.loading, codeVerification: false },
            success: { codeVerification: { code } },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, codeVerification: message },
            success: { ...state.success, codeVerification: undefined },
            loading: { ...state.loading, codeVerification: false },
          };
        },
      },

      VERIFY_EMAIL: (state) => ({
        ...state,
        loading: { ...state.loading, emailVerification: true },
        error: { ...state.error, emailVerification: undefined },
        success: { ...state.success, emailVerification: undefined },
      }),
      VERIFY_EMAIL_RESPONSE: {
        next(state) {
          return {
            ...state,
            loading: { ...state.loading, emailVerification: false },
            success: { emailVerification: true },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, emailVerification: message },
            success: { ...state.success, emailVerification: undefined },
            loading: { ...state.loading, emailVerification: false },
          };
        },
      },

      CHANGE_FORGOT_PASSWORD: (state) => ({
        ...state,
        loading: { ...state.loading, changeForgotPassword: true },
        error: { ...state.error, changeForgotPassword: undefined },
      }),
      CHANGE_FORGOT_PASSWORD_RESPONSE: {
        next(state) {
          return {
            ...state,
            loading: { ...state.loading, changeForgotPassword: false },
            success: { ...state.success, changeForgotPassword: true },
            error: INITIAL_STATE.error,
          };
        },
        throw(state, { payload: { message } }) {
          return {
            ...state,
            error: { ...state.error, changeForgotPassword: message },
            success: { ...state.success, changeForgotPassword: undefined },
            loading: { ...state.loading, changeForgotPassword: false },
          };
        },
      },

      SET_TOKEN: (state) => ({
        ...state,
        error: {
          ...state.error,
          setToken: false,
        },
        loading: {
          ...state.loading,
          setToken: true,
        },
      }),

      SET_TOKEN_RESPONSE: {
        next(state) {
          return {
            ...state,
            loading: { ...state.loading, setToken: false },
            success: { setToken: true },
            error: INITIAL_STATE.error,
          };
        },
        throw(state) {
          return {
            ...state,
            error: { ...state.error, setToken: true },
            loading: { ...state.loading, setToken: false },
          };
        },
      },

      CANCEL_FORGOT_PASSWORD: (state) => ({
        ...state,
        loading: { ...state.loading, forgotPassword: false },
        error: { ...state.error, forgotPassword: undefined },
        success: { ...state.success, forgotPassword: undefined },
      }),

      CLEAR_LOGIN_PROCESS: (state) => ({
        ...state,
        loading: { ...state.loading, login: false },
        error: { ...state.error, login: undefined },
        success: { ...state.success, login: undefined },
      }),
      CLEAR_MIGRATED: (state) => ({
        ...state,
        success: { ...state.success, isMigrated: undefined },
      }),
    },
  },
  INITIAL_STATE
);

export default reducer;
