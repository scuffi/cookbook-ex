import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Create } from "./Create";

test("loads empty create form", async () => {
  // ARRANGE
  render(<Create />);

  // ACT
  const submitButton = await screen.findByTestId("form-submit-btn");

  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("Create a recipe");
  expect(submitButton).toHaveTextContent("Create recipe");
});

test("allows user to create a recipe", async () => {});
