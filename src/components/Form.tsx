import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { createRecipe, deleteRecipe, fetchRecipes, modifyRecipe } from "../api";
import { RecipeContext } from "../context";
import { Recipe } from "../models";
import { ConfirmButton, DeleteButton } from "./Button";
import { IconSelector } from "./IconSelector";
import { IngredientForm } from "./IngredientForm";

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  margin-top: 1.5rem;
`;

export const Input = styled.input`
  font-size: 1rem;
  font-family: inherit;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
  background-color: white;
  line-height: 1.5;
  margin: 0;
`;

type Props = {
  recipe?: Recipe | null;
};

export function RecipeForm({ recipe }: Props) {
  const { recipes, setRecipes } = useContext(RecipeContext);
  const history = useHistory();

  const [recipeState, setRecipeState] = useState<Recipe>(
    recipe ||
      ({
        name: "",
        description: "",
        icon: "🍔",
        ingredients: [],
      } as Recipe)
  );

  useEffect(() => {
    setRecipeState(
      recipe ||
        ({
          name: "",
          description: "",
          icon: "🍔",
          ingredients: [],
        } as Recipe)
    );
  }, [recipe]);

  const setAttribute = (attribute: string, value: any) => {
    setRecipeState((prevState) => ({ ...prevState, [attribute]: value }));
  };

  /**
   * Function to handle the submition of the form, and will either attempt to modify or create a recipe,
   * depending on whether or not the recipe already exists. It will also fetch the recipes after the modification.
   * @param event - The event parameter is of type React.FormEvent
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (recipe) {
      modifyRecipe(recipeState).then(() => fetchRecipes().then(setRecipes));
    } else {
      createRecipe(recipeState).then((recipe) => {
        fetchRecipes().then(setRecipes);
        history.push(`/recipe/${recipe.id}`);
      });
    }
  };

  /**
   * Function to handle the press of the delete button. It will delete the recipe and redirect to the first recipe in the list.
   * @param event - The event parameter is of type React.FormEvent
   */
  const handleDelete = (event: React.FormEvent) => {
    event.preventDefault();
    if (recipe) {
      deleteRecipe(recipeState).then(() => fetchRecipes().then(setRecipes));
      if (recipes.length > 0) {
        history.replace(`/recipe/${recipes[0].id}`);
      } else {
        history.replace(`/create`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ fontSize: "3rem" }}>
        {recipe ? "Edit" : "Create"} a recipe
      </h1>
      <Label>Recipe name</Label>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <Input
          required
          value={recipeState.name}
          onChange={(name) => setAttribute("name", name.target.value)}
        />
        <IconSelector onChange={(icon) => setAttribute("icon", icon)}>
          {recipeState.icon}
        </IconSelector>
      </div>
      <Label>Recipe description</Label>
      <Input
        required
        size={50}
        multiple
        value={recipeState.description}
        onChange={(description) =>
          setAttribute("description", description.target.value)
        }
      />
      <Label>Ingredients</Label>
      <IngredientForm
        ingredients={recipeState.ingredients}
        onChange={(ingredients) => setAttribute("ingredients", ingredients)}
      />
      <ConfirmButton type="submit">
        {recipe ? "Update" : "Create"} recipe
      </ConfirmButton>
      {recipe && (
        <DeleteButton
          data-testid="form-submit-btn"
          type="button"
          onClick={handleDelete}
        >
          Delete recipe
        </DeleteButton>
      )}
    </form>
  );
}
