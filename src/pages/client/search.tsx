import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation, useParams } from "react-router";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../__generated__/searchRestaurant";

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
  let [_, query] = location.search.split("?term=");
  query = decodeURI(query);
  const [callQuery, { loading, data, error, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    // replace page
    if (!query) {
      return history.replace("/");
    }
    // Lazy Query
    callQuery({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, [history, location]);

  console.log(loading, data, called);
  console.log(query);
  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <div className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <h1 className="text-4xl text-center font-bold ">검색 결과 : {query}</h1>
      </div>
    </div>
  );
};
