import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";

export const LoggedOutRouter = () => {
  // 화면 구성
  return (
    <Router>
      <Switch>
        <Route path="/sign-up">
          <Signup />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
