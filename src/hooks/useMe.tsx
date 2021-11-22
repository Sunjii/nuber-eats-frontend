import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { meQuery } from "../__generated__/meQuery";

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

// queryHook을 사용하는 것으로 cache 효과를 얻을 수 있음. 여러번 호출하더라도 이미 데이터가 있다면 재호출 하지 않음.
// deep component에게 props를 전달할때 효과적임

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
