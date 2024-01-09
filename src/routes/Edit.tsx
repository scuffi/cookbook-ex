import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import { fetchRecipe } from "../api";
import { RecipeForm } from "../components/Form";
import { Central } from "../components/Layout";
import { Recipe } from "../models";

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
