import { getByText, render } from "@testing-library/react";
import React from "react";
import { Restaurant } from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("renders OK with prpos", () => {
    const restaurnatProps = {
      id: "1",
      name: "nameTest",
      categoryName: "catTest",
      coverImg: "imgTest",
    };

    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurnatProps} />
      </Router>
    );
    getByText(restaurnatProps.name);
    getByText(restaurnatProps.categoryName);
    expect(container.firstChild).toHaveAttribute(
      "href",
      `/restaurants/${restaurnatProps.id}`
    );
  });
});
