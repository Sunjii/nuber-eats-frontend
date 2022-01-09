import { ApolloProvider } from "@apollo/client";
import { RenderResult } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { render, waitFor } from "../../test-utils";
import { Signup } from "../signup";

describe("<Sign />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Signup />
        </ApolloProvider>
      );
    });
  });

  it("render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Sign Up | Nuber Eats");
    });
  });
});
