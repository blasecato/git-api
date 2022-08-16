/* eslint-disable import/no-cycle */
import { ADMIN_URL } from "../../common/config/config";
import { all, put, select, takeLatest } from "redux-saga/effects";
import ApiConnection from "../../common/api/Api";
import parseError from "../../common/api/ErrorParser";
import * as TokenStorage from "../../common/storage/Token";
import authActions from "./actions";

function* login({ payload: credentials }) {
  const url = "/auth/login-insurance";

  const response = yield ApiConnection.post(url, credentials);

  if (response.message === "PASSWORD_UPDATE_REQUIRED")
    return yield put(authActions.loginResponsePasswordRequired());
  if (response.message === "IS_MIGRATED") {
    return yield put(authActions.loginResponseMigrated({ user: response.detail }));
  }

  if (response.message === "IS_MIGRATED") {
    return yield put(authActions.loginResponseMigrated({ user: response.detail }));
  }

  if (!response.success && !response.message !== "IS_MIGRATED")
    return yield put(authActions.loginResponse(parseError(response), response));

  yield TokenStorage.save(response.detail, `@token${response.message}`);
  if (response.message === "ADMIN") {
    window.location.href = `${ADMIN_URL}/sso/${response.detail}`;
    return null;
  }

  return yield put(
    authActions.loginResponse({
      token: response.detail,
      profile: yield TokenStorage.decodeToken(),
    })
  );
}

function* logout() {
  yield TokenStorage.remove();
  return yield put(authActions.logoutResponse());
}

function* signup({ payload: user }) {
  const url = "/auth/signup";

  const response = yield ApiConnection.post(url, user);
  if (response.status === "SUCCESS") {
    yield TokenStorage.save(response.payload);
    return yield put(
      authActions.signupResponse({
        token: response.payload,
        profile: TokenStorage.decodeToken(),
      })
    );
  }

  let err;
  if (response.status) err = new TypeError(response.status);
  else if (response.message) err = new TypeError(response.message[0]);
  else err = new TypeError("ERROR_SIGNUP");

  return yield put(authActions.signupResponse(err, response));
}

function* setToken({ payload: { token } }) {
  const url = "/auth/verify-token";
  const response = yield ApiConnection.getValidate(url, token);

  if (!response.success) return yield put(authActions.setTokenResponse(parseError(response)));

  return yield put(authActions.setTokenResponse());
}

function* changeForgotPassword({ payload: password }) {
  const getAuth = (state) => state.auth;
  const { success: auth } = yield select(getAuth);
  const data = {
    password,
    code: auth.codeVerification.code,
  };
  const response = yield ApiConnection.post("/auth/forgot-password", data);
  if (response.status === "SUCCESS") return yield put(authActions.changeForgotPasswordResponse());

  let err;
  if (response.status) err = new TypeError(response.status);
  else if (response.message) err = new TypeError(response.message[0]);
  else err = new TypeError("UNDEFINED_ERROR");

  return yield put(authActions.changeForgotPasswordResponse(err, response));
}

function* isLogged() {
  const isToken = yield TokenStorage.isToken();
  yield put(authActions.setLogged(isToken));
}

function* forgotPassword({ payload: email }) {
  const response = yield ApiConnection.post("/auth/request-forgot-password", {
    ...email,
    origin: "AGENT",
  });

  if (response.status === "SUCCESS") return yield put(authActions.forgotPasswordResponse());

  let err;
  if (response.status) err = new TypeError(response.status);
  else if (response.message) err = new TypeError(response.message[0]);
  else err = new TypeError("UNDEFINED_ERROR");

  return yield put(authActions.forgotPasswordResponse(err, response));
}

function* updatePassword({ payload }) {
  const response = yield ApiConnection.post("/auth/update-password", {
    ...payload,
  });
  if (response.success) return yield put(authActions.updatePasswordResponse());

  return yield put(authActions.updatePasswordResponse(parseError(response)));
}

function* verifyEmail({ payload: email }) {
  const response = yield ApiConnection.post("/auth/verify-email", email);

  if (response.status === "SUCCESS") return yield put(authActions.verifyEmailResponse());
  let err;
  if (response.status) err = new TypeError(response.status);
  else if (response.message) err = new TypeError(response.message[0]);
  else err = new TypeError("ERROR_FORGOT_PASSWORD");

  return yield put(authActions.verifyEmailResponse(err, response));
}

function* verifyCode({ payload: code }) {
  const response = yield ApiConnection.post("/auth/verify-code", code);
  if (response.status === "SUCCESS") return yield put(authActions.verifyCodeResponse(code));

  let err;
  if (response.status) err = new TypeError(response.status);
  else if (response.message) err = new TypeError(response.message[0]);
  else err = new TypeError("ERROR_FORGOT_PASSWORD");

  return yield put(authActions.verifyCodeResponse(err, response));
}

function* ActionWatcher() {
  yield takeLatest(authActions.login, login);
  yield takeLatest(authActions.logout, logout);
  yield takeLatest(authActions.signup, signup);
  yield takeLatest(authActions.forgotPassword, forgotPassword);
  yield takeLatest(authActions.changeForgotPassword, changeForgotPassword);
  yield takeLatest(authActions.isLogged, isLogged);
  yield takeLatest(authActions.verifyEmail, verifyEmail);
  yield takeLatest(authActions.verifyCode, verifyCode);
  yield takeLatest(authActions.setToken, setToken);
  yield takeLatest(authActions.updatePassword, updatePassword);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
