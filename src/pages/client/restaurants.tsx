import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import {
  restauarntsPageQuery,
  restauarntsPageQueryVariables,
} from "../../__generated__/restauarntsPageQuery";

const RESTAURANTS_QUERY = gql`
  query restauarntsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }

    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants = () => {
  const { data, loading, error } = useQuery<
    restauarntsPageQuery,
    restauarntsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });

  console.log(data);
  return <h1>Restaurants</h1>;
};
