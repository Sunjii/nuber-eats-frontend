/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: categoryInfo
// ====================================================

export interface categoryInfo_categoryInfo_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface categoryInfo_categoryInfo_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: categoryInfo_categoryInfo_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface categoryInfo_categoryInfo_category {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface categoryInfo_categoryInfo {
  __typename: "CategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: categoryInfo_categoryInfo_restaurants[] | null;
  category: categoryInfo_categoryInfo_category | null;
}

export interface categoryInfo {
  categoryInfo: categoryInfo_categoryInfo;
}

export interface categoryInfoVariables {
  input: CategoryInput;
}
