import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Create } from "./Create";

test("loads empty create form", async () => {
  render(<Create />);
  const titleElement = screen.getByText("Create a recipe");
  expect(titleElement).toBeInTheDocument();
});
