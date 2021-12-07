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
              <div>
                <div
                  style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                  className="bg-red-500 py-28 bg-cover bg-center mb-3"
                ></div>
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <div className="border-t-2 mt-3 py-2 text-xs border-gray-300 opacity-50">
                  {restaurant.category?.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/*
import React from "react";
import { useMe } from "../hooks/useMe";

export const Category: React.FC = () => {
  const { data } = useMe();

  return (
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
  );
};
*/
