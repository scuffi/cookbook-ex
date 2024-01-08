import { createContext } from "react";
import { Recipe } from "../models";

const RecipeContext = createContext({
    recipes: [] as Recipe[],
    setRecipes: (recipes: Recipe[]) => {}
});

export default RecipeContext;