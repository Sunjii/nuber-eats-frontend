import React from "react";
import { render, waitFor } from "@testing-library/react";
import { App } from "../app";
import { isLoggedInVar } from "../../apollo";

jest.mock("../../routers/logged-out-router", () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});
jest.mock("../../routers/logged-in-router", () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

// Test
describe("<App />", () => {
  it("renders OK", () => {
    const { getByText } = render(<App />);
    getByText("logged-out");
  });

  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText("logged-in");
  });
});
