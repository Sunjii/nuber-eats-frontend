import { ApolloProvider } from "@apollo/client";
import { RenderResult, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { render, waitFor } from "../../test-utils";
import { UserRole } from "../../__generated__/globalTypes";
import { CREATE_ACCOUNT_MUTATION, Signup } from "../signup";

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

  it("render validation errors", async () => {
    const { getByRole, getByPlaceholderText, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");

    await waitFor(() => {
      userEvent.type(email, "wont@work");
    });
    let errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent("이메일 형식으로 입력하세요");

    // clear
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Email is required./i);

    await waitFor(() => {
      userEvent.type(email, "working@email.com");
      userEvent.click(button);
    });
    errorMessage = getByRole("alert");
    expect(errorMessage).toHaveTextContent(/Password is required./i);
  });

  it("submits mutation with form values", async () => {
    const { getByRole, getByPlaceholderText, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole("button");
    const formData = {
      email: "working@email.com",
      password: "123456789",
      role: UserRole.Client,
    };
    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: "mutation-error",
        },
      },
    });
    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedLoginMutationResponse
    );
    // window alert test
    jest.spyOn(window, "alert").mockImplementation(() => null);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });
    expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith("계정 생성 완료!");
  });
});
