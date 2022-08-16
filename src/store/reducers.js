import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import userReducer from "../services/users/reduser";

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
  });

const rootReducer = (history) => (state, action) => {
  if (action.type === "AUTH/LOGOUT_RESPONSE") return appReducer(history)(undefined, action);
  return appReducer(history)(state, action);
};

export default rootReducer;
