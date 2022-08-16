import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { isProduction } from "../common/config/config";
// eslint-disable-next-line import/no-cycle
import rootSaga from "./sagas";
import rootReducers from "./reducers";

// eslint-disable-next-line import/no-anonymous-default-export
export default (history) => {
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleware = routerMiddleware(history);

  let middleware = [sagaMiddleware, routeMiddleware];
  if (!isProduction) middleware = [...middleware, logger];

  const store = createStore(
    rootReducers(history),
    composeWithDevTools(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
