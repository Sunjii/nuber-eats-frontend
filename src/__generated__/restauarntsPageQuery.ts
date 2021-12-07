/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restauarntsPageQuery
// ====================================================

export interface restauarntsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface restauarntsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: restauarntsPageQuery_allCategories_categories[] | null;
}

export interface restauarntsPageQuery_restaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface restauarntsPageQuery_restaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restauarntsPageQuery_restaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface restauarntsPageQuery_restaurants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: restauarntsPageQuery_restaurants_results[] | null;
}

export interface restauarntsPageQuery {
  allCategories: restauarntsPageQuery_allCategories;
  restaurants: restauarntsPageQuery_restaurants;
}

export interface restauarntsPageQueryVariables {
  input: RestaurantsInput;
}
