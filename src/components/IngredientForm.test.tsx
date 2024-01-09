import { render, screen, fireEvent } from "@testing-library/react";
import { IngredientForm } from "./IngredientForm";

test("has add button", async () => {
  render(<IngredientForm ingredients={[]} onChange={() => {}} />);
  const addButton = screen.getByText("➕");
  expect(addButton).toBeInTheDocument();
});

test("allows user to add ingredient", async () => {
  const onChangeMock = jest.fn();
  render(<IngredientForm ingredients={[]} onChange={onChangeMock} />);
  const addButton = screen.getByText("➕");
  fireEvent.click(addButton);
  expect(onChangeMock).toHaveBeenCalledWith([{ name: "" }]);
});

test("allows user to remove ingredient", async () => {
  const onChangeMock = jest.fn();
  render(
    <IngredientForm
      ingredients={[{ name: "Ingredient 1" }, { name: "Ingredient 2" }]}
      onChange={onChangeMock}
    />
  );
  const deleteButton = screen.getAllByText("🗑️")[0];
  fireEvent.click(deleteButton);
  expect(onChangeMock).toHaveBeenCalledWith([{ name: "Ingredient 2" }]);
});
