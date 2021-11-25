import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Not Found | Nuber Eats</title>
      </Helmet>
      <h2 className="font-semibold text-4xl mb-3">Page Not Found.</h2>
      <h4 className="font-medium text-lg mb-5">
        찾는 페이지가 존재하지 않습니다.
      </h4>
      <Link className="hover:underline text-lime-600" to="/">
        Go back home &rarr;
      </Link>
    </div>
  );
};
