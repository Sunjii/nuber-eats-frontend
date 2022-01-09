import React from "react";
import { Login, LOGIN_MUTATION } from "../login";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { ApolloProvider } from "@apollo/client";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("<Login />", () => {
  let renderResult: RenderResult;
  let mockClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Login | Nuber Eats");
    });
  });

  it("display email validation errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    await waitFor(() => {
      userEvent.type(email, "this@wont");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/올바른 이메일을 입력하세요/);

    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required./i);
  });

  it("display password required errors", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const submitBtn = getByRole("button");
    await waitFor(() => {
      userEvent.type(email, "this@work.com");
      userEvent.click(submitBtn);
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password is required./i);
  });

  it("submit form and calls mutation", async () => {
    const { getByPlaceholderText, debug, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole("button");
    const formData = {
      email: "real@test.com",
      password: "123456789",
    };
    // mock Mutation
    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          ok: true,
          token: "XXX",
          error: null,
        },
      },
    });
    // set Request Handler
    mockClient.setRequestHandler(LOGIN_MUTATION, mockedMutationResponse);
    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });
    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      loginInput: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
});
