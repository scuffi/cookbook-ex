import styled from "styled-components";
import { Ingredient } from "../models";
import { Button } from "./Button";
import { Input } from "./Form";

const DeleteButton = styled.button`
  font-size: 1rem;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
`;

type Props = {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
};

export function IngredientForm({ ingredients, onChange }: Props) {
  /**
   * Function to add a new ingredient to the list of ingredients, then call the onChange prop with the new ingredients.
   */
  const addIngredient = () => {
    const newIngredients = [...ingredients];
    newIngredients.push({ name: "" });
    onChange(newIngredients);
  };

  return (
    <div style={{ paddingBottom: "1rem" }}>
      {ingredients.map((ingredient, index) => (
        <div key={index} style={{ paddingBottom: "1rem" }}>
          <Input
            required
            type="text"
            value={ingredient.name}
            onChange={(event) => {
              const newIngredients = [...ingredients];
              newIngredients[index] = { name: event.target.value };
              onChange(newIngredients);
            }}
          />
          <DeleteButton
            type="button"
            onClick={() => {
              const newIngredients = [...ingredients];
              newIngredients.splice(index, 1);
              onChange(newIngredients);
            }}
          >
            🗑️
          </DeleteButton>
        </div>
      ))}
      <Button type="button" onClick={addIngredient}>
        ➕
      </Button>
    </div>
  );
}
