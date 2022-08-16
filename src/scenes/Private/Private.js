import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import Profile from "./Profile/Profile";

const Private = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/profile/:username" component={Profile} />
      </Switch>
    </Router>
  );
};

export default Private;
