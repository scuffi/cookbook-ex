import axios from "axios";
import toast from "react-hot-toast";
import { Recipe } from "../models";

/**
 * Function to delete a recipe from the database. Whilst this takes an object, the only field that is used is
 * the `id` field, so the Recipe object can be empty.
 * @param {Recipe} recipe - The `recipe` parameter is an object that represents a recipe.
 * @returns An object containing a message that the recipe was deleted successfully.
 */
const deleteRecipe = async (recipe: Recipe) => {
    const response = await axios.delete(`http://localhost:8000/recipes/${recipe.id}/`);

    if (response.status !== 200) {
        toast.error("Failed to delete recipe!");
        console.log(response);
        return [];
    }

    toast.success("Recipe deleted successfully!");
    return response.data;
}

export default deleteRecipe;