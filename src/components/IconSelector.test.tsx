import { render, screen } from "@testing-library/react";
import { IconSelector } from "./IconSelector";

test("loads picker button", async () => {
  render(<IconSelector onChange={() => {}}>Picker Button</IconSelector>);

  const buttonElement = screen.getByText("Picker Button");
  expect(buttonElement).toBeInTheDocument();
});
