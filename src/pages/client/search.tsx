import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router";
import { Restaurant } from "../../components/restaurant";
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
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT);

  useEffect(() => {
    // replace page
    if (!query || query === "undefined") {
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

  //console.log(data?.searchRestaurant.totalResults);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <div className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <h1 className="text-4xl text-center font-bold text-white hover:text-red-400">
          "{query}"　
        </h1>
        <h1 className="text-4xl text-center font-bold text-white">
          검색 결과 총 {data?.searchRestaurant.totalResults}건
        </h1>
      </div>
      <div className="grid mt-10 md:grid-cols-1 gap-x-5 gap-y-12">
        {data?.searchRestaurant.searchingResults?.map((restaurant) => (
          <Restaurant
            key={restaurant.id}
            id={restaurant.id + ""}
            name={restaurant.name}
            coverImg={restaurant.coverImage}
            categoryName={restaurant.category?.name}
          />
        ))}
      </div>
      <div>
        {!data?.searchRestaurant.totalResults && (
          <div>검색 결과가 없습니다</div>
        )}
      </div>
    </div>
  );
};
