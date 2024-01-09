import { render, screen, fireEvent } from "@testing-library/react";
import { IconSelector } from "./IconSelector";

test("loads picker button", async () => {
  render(<IconSelector onChange={() => {}}>Picker Button</IconSelector>);

  const buttonElement = screen.getByText("Picker Button");
  expect(buttonElement).toBeInTheDocument();
});

// test("opens picker on button press", async () => {
//   render(<IconSelector onChange={() => {}}>Picker Button</IconSelector>);

//   const buttonElement = screen.getByText("Picker Button");
//   fireEvent.click(buttonElement);

//   const pickerElement = screen.getByTestId("icon-picker");
//   expect(pickerElement).toBeInTheDocument();
// });

// test("calls onEmojiClick when emoji selected", async () => {
//   const mockOnChange = jest.fn();
//   render(<IconSelector onChange={mockOnChange}>Picker Button</IconSelector>);

//   const buttonElement = screen.getByText("Picker Button");
//   fireEvent.click(buttonElement);

//   const emojiElement = screen.getByText("😀"); // Replace with the actual emoji text
//   fireEvent.click(emojiElement);

//   expect(mockOnChange).toHaveBeenCalledWith("😀"); // Replace with the expected emoji value
// });
