import gql from "graphql-tag";
import React from "react";

const RESTAURANTS_QUERY = gql`
  query restauarntsPageQuery($input: RestaurantsInput) {
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

export const Restaurants = () => <h1>Restauarnts</h1>;
