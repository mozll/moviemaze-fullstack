import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FooterBanner from "./FooterBanner";

test("renders a basic element", () => {
  const { getByText } = render(
    <BrowserRouter>
      <FooterBanner />
    </BrowserRouter>
  );

  expect(getByText("Join Today")).toBeInTheDocument();
  expect(getByText("Sign Up")).toBeInTheDocument();
});
