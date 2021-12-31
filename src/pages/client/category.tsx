import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  categoryInfo,
  categoryInfoVariables,
} from "../../__generated__/categoryInfo";

const CATEGORY_QUERY = gql`
  query categoryInfo($input: CategoryInput!) {
    categoryInfo(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<ICategoryParams>();
  const { data, loading } = useQuery<categoryInfo, categoryInfoVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug: params.slug,
        },
      },
    }
  );

  //console.log(data);

  return (
    <div>
      <Helmet>
        <title>Search | Nuber Eats</title>
      </Helmet>
      <div className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <div className="flex flex-col items-center cursor-pointer group">
          <div
            className="w-44 h-44 rounded-full bg-cover group-hover:bg-red-300"
            style={{
              backgroundImage: `url(${data?.categoryInfo.category?.coverImage})`,
            }}
          ></div>
          <span className="mt-5 text-4xl text-center font-bold text-white hover:text-red-400">
            {data?.categoryInfo.category?.name}
          </span>
        </div>
      </div>
    </div>
  );
};
