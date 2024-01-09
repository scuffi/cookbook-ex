import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel";

describe("NavigationPanel", () => {
  const recipe = {
    id: 1,
    name: "Recipe Name",
    description: "Recipe Description",
    icon: "🍔",
    ingredients: [],
  };

  test("renders recipe name and description", () => {
    render(
      <MemoryRouter>
        <NavigationPanel {...recipe} />
      </MemoryRouter>
    );

    const recipeName = screen.getByText(recipe.name);
    const recipeDescription = screen.getByText(recipe.description);

    expect(recipeName).toBeInTheDocument();
    expect(recipeDescription).toBeInTheDocument();
  });

  test("redirects user to recipe page", () => {
    render(
      <MemoryRouter>
        <NavigationPanel {...recipe} />
      </MemoryRouter>
    );

    const navigationButton = screen.getByTestId("navigation-button");
    expect(navigationButton).toHaveAttribute("href", `/recipe/${recipe.id}`);
  });
});
