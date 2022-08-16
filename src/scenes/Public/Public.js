import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";

const Public = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Public;
