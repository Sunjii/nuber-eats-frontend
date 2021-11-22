import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  // loading screen
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-bold text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  // main screen
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
