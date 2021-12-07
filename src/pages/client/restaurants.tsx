import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { Restaurant } from "../../components/restaurant";
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
  return (
    <div>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="Search"
          className="input w-1/4 rounded-md border-0"
          placeholder="Search Restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-xl mx-auto mt-10">
          <div className="flex justify-around max-w-md mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div className="flex flex-col items-center cursor-pointer group">
                <div
                  className="w-16 h-16 rounded-full bg-cover group-hover:bg-red-300"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className="text-sm text-center font-bold mt-5">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-12">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                name={restaurant.name}
                coverImg={restaurant.coverImage}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
