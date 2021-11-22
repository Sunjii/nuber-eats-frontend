import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
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
      <Header email={data.me.email} />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
