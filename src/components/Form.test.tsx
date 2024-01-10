import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { RecipeForm } from "./Form";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { createRecipe } from "../api";

const mock = new MockAdapter(axios);

mock.onGet("http://localhost:8000/recipes").reply(200, [
  {
    id: 1,
    name: "Hotdog",
    description: "bun'n'dog",
    icon: "\ud83c\udf2d",
    ingredients: [{ name: "bun" }, { name: "dog" }],
  },
]);

mock.onPatch("http://localhost:8000/recipes/1/").reply(200, [
  {
    id: 1,
    name: "New Pizza",
    description: "bun'n'dog",
    icon: "\ud83c\udf2d",
    ingredients: [{ name: "bun" }, { name: "dog" }],
  },
]);

mock.onDelete("http://localhost:8000/recipes/1/").reply(200, [{}]);

mock.onPost("http://localhost:8000/recipes/").reply(201, [
  {
    id: 4,
    name: "Pizza",
    description: "bun'n'dog",
    icon: "\ud83c\udf2d",
    ingredients: [{ name: "bun" }, { name: "dog" }],
  },
]);

test("loads create form when recipe not given", async () => {
  render(<RecipeForm />);
  expect(screen.getByText("Recipe name")).toBeInTheDocument();
  expect(screen.getByText("Recipe description")).toBeInTheDocument();
  expect(screen.getByText("Ingredients")).toBeInTheDocument();
  expect(screen.getByText("Create recipe")).toBeInTheDocument();
});

test("loads edit form when recipe given", async () => {
  const recipe = {
    name: "Pizza",
    description: "Delicious pizza",
    icon: "🍕",
    ingredients: [
      { name: "Dough" },
      { name: "Tomato sauce" },
      { name: "Cheese" },
    ],
  };
  render(<RecipeForm recipe={recipe} />);
  expect(screen.getByTestId("form-name-input")).toHaveValue("Pizza");
  expect(screen.getByTestId("form-description-input")).toHaveValue(
    "Delicious pizza"
  );
  expect(screen.getByText("Ingredients")).toBeInTheDocument();
  expect(screen.getByText("Update recipe")).toBeInTheDocument();
});

test("allows user to edit a recipe", async () => {
  const recipe = {
    id: 1,
    name: "Pizza",
    description: "Delicious pizza",
    icon: "🍕",
    ingredients: [
      { name: "Dough" },
      { name: "Tomato sauce" },
      { name: "Cheese" },
    ],
  };
  render(<RecipeForm recipe={recipe} />);

  const nameInput = screen.getByTestId("form-name-input");
  const submitButton = screen.getByText("Update recipe");
  jest.spyOn(axios, "patch");

  fireEvent.change(nameInput, { target: { value: "New Pizza" } });
  submitButton.click();

  expect(nameInput).toHaveValue("New Pizza");

  await waitFor(() => {
    expect(axios.patch).toHaveBeenCalled();
  });
});

test("rejects submission when input fields are empty", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecipeForm />
    </Router>
  );
  const submitButton = screen.getByTestId("form-submit-btn");
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByTestId("form-name-input")).toBeInvalid();
  });

  await waitFor(() => {
    expect(screen.getByTestId("form-description-input")).toBeInvalid();
  });
});

test("allows user to delete recipe", async () => {
  const history = createMemoryHistory();
  const recipe = {
    id: 1,
    name: "Pizza",
    description: "Delicious pizza",
    icon: "🍕",
    ingredients: [
      { name: "Dough" },
      { name: "Tomato sauce" },
      { name: "Cheese" },
    ],
  };
  render(
    <Router history={history}>
      <RecipeForm recipe={recipe} />
    </Router>
  );
  const deleteButton = screen.getByTestId("form-delete-btn");
  jest.spyOn(axios, "delete");

  fireEvent.click(deleteButton);

  expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
  await waitFor(() => {
    expect(axios.delete).toHaveBeenCalled();
  });
});

test("allows user to create recipe", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <RecipeForm />
    </Router>
  );
  const nameInput = screen.getByTestId("form-name-input");
  const descriptionInput = screen.getByTestId("form-description-input");
  const submitButton = screen.getByTestId("form-submit-btn");
  jest.spyOn(axios, "post");

  fireEvent.change(nameInput, { target: { value: "Pizza" } });
  fireEvent.change(descriptionInput, {
    target: { value: "Delicious pizza" },
  });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(axios.post).toHaveBeenCalled();
  });
});
