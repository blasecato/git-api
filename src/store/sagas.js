/* eslint-disable import/no-cycle */
import { all, fork } from "redux-saga/effects";
import userSaga from "../services/users/saga";

export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ]);
}
