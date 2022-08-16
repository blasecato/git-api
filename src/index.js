import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import "./sass/main.scss";
import reportWebVitals from "./reportWebVitals";
import { ConnectedRouter } from "connected-react-router";
import initStore from "./store";

const history = createBrowserHistory();
const store = initStore(history);
export default store;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();