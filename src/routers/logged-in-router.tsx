import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

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
    <div>
      <h1>You are Logged In!</h1>
      <h2>{data.me.email}</h2>
      <button onClick={() => isLoggedInVar(false)}>Log out</button>
    </div>
  );
};
