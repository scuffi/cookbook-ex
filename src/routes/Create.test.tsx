import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Create } from "./Create";

test("loads empty form", async () => {
  // ARRANGE
  render(<Create />);

  // ACT
  //   await userEvent.click(screen.getByText("Load Greeting"));
  //   await screen.findByRole("heading");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("Create a recipe");
  expect(screen.getByTestId("form-submit-btn")).toHaveTextContent(
    "Create recipe"
  );
});
