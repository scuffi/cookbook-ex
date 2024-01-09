import axios from "axios";
import toast from "react-hot-toast";
import { Recipe } from "../models";

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