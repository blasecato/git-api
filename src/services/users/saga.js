/* eslint-disable import/no-cycle */
import ApiConnection from "../../common/api/Api";
import { all, put, takeLatest } from "redux-saga/effects";
import parseError from "../../common/api/ErrorParser";
import usersActions from "./actions";


function* getUser({ payload }) {
  const url = "users/";
  const response = yield ApiConnection.get(url+payload.user);
  if (response.status !== 200)
    return yield put(usersActions.getUserResponse(parseError(response), response));
  return yield put(
    usersActions.getUserResponse({
      user: response.data,
    })
  );
}

function* getRepos({ payload }) {
  const url = "users/";
  const response = yield ApiConnection.get(url+payload.user+"/repos");
  if (response.status !== 200)
    return yield put(usersActions.getReposResponse(parseError(response), response));
  return yield put(
    usersActions.getReposResponse({
      repos: response.data,
    })
  );
}

function* getRepo({ payload }) {
  const url = "repos";
  const response = yield ApiConnection.get(url+"/"+payload?.userRepo);
  if (response.status !== 200)
    return yield put(usersActions.getRepoResponse(parseError(response), response));
  return yield put(
    usersActions.getRepoResponse({
      userRepo: response.data,
    })
  );
}


function* ActionWatcher() {
  yield takeLatest(usersActions.getUser, getUser);
  yield takeLatest(usersActions.getRepos, getRepos);
  yield takeLatest(usersActions.getRepo, getRepo);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
