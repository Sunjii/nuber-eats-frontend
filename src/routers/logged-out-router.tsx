import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../pages/404";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import Something from "../pages/something";

export const LoggedOutRouter = () => {
  // 화면 구성
  return (
    <Router>
      <Switch>
        <Route path="/something">
          <Something />
        </Route>
        <Route path="/sign-up">
          <Signup />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
