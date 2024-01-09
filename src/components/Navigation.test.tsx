import { render, screen, waitFor } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { RecipeContext } from "../context";
import { ReactNode, useState } from "react";
import { Recipe } from "../models";

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

// Mock the API response
mock.onGet("http://localhost:8000/recipes").reply(200, [
  {
    id: 1,
    name: "Hotdog",
    description: "bun'n'dog",
    icon: "\ud83c\udf2d",
    ingredients: [{ name: "bun" }, { name: "dog" }],
  },
]);

const MockRecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

test("has create button", async () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  const createButtonElement = screen.getByText("+ New Recipe");
  expect(createButtonElement).toBeInTheDocument();
});

test("create button redirects", async () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );

  const createButtonLinkElement = screen.getByTestId("nav-create-btn");
  expect(createButtonLinkElement).toHaveAttribute("href", "/create");
});

test("has navigation panels", async () => {
  render(
    <BrowserRouter>
      <MockRecipeProvider>
        <Navigation />
      </MockRecipeProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    const navigationPanel = screen.getByText("Hotdog");
    expect(navigationPanel).toBeInTheDocument();
  });
});
