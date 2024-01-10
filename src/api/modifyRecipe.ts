import axios from "axios";
import toast from "react-hot-toast";
import { Recipe } from "../models";
import config from "../config";

/**
 * Function to modify an existing recipe in the database. The given recipe will update the existing recipe, based
 * on the `id` field.
 * @param {Recipe} recipe - The `recipe` parameter is an object that represents a recipe. It is used to update
 * the recipe with the same `id` field, all other fields will be modified.
 * @returns The modified Recipe object
 */
const modifyRecipe = async (recipe: Recipe) => {
    const response = await axios.patch(`${config.api.url}${recipe.id}/`, recipe);

    if (response.status !== 200) {
        toast.error("Failed to update recipe!");
        console.log(response);
        return [];
    }

    toast.success("Recipe updated successfully!");
    return response.data;
}

export default modifyRecipe;