import { gql } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      searchingResults {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const [_, searchTerm] = location.search.split("?term=");
    // replace page
    if (!searchTerm) {
      return history.replace("/");
    }

    // Lazy Query

    console.log(searchTerm);
  }, []);

  return (
    <h1>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
    </h1>
  );
};
