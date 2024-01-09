import { Central } from "../components/Layout";
import { RecipeForm } from "../components/Form";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Recipe } from "../models";
import fetchRecipe from "../api/fetchRecipe";
import toast from "react-hot-toast";

interface Params {
  recipeId: string;
}

export function Edit() {
  const { recipeId } = useParams<Params>();
  const history = useHistory();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    fetchRecipe(recipeId)
      .then(setRecipe)
      .catch(() => {
        toast.error(`Recipe with id ${recipeId} not found`);
        history.replace("/create");
      });
  }, [recipeId, history]);

  return (
    <Central>
      {recipe ? <RecipeForm recipe={recipe} /> : <h1>Loading...</h1>}
    </Central>
  );
}
