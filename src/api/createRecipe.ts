import axios from "axios";
import toast from "react-hot-toast";
import { Recipe } from "../models";

/**
 * Function to attempt to create a recipe from a given object.
 * @param {Recipe} recipe - The `recipe` parameter is an object that represents the recipe you want to
 * create.
 * @returns The created Recipe object, which will be the same as the given Recipe, but with an `id` field specified.
 */
const createRecipe = async (recipe: Recipe) => {
    const response = await axios.post(`http://localhost:8000/recipes/`, recipe);

    if (response.status !== 201) {
        toast.error("Failed to create recipe!");
        console.log(response);
        return [];
    }

    toast.success("Recipe created successfully!");
    return response.data;
}

export default createRecipe;