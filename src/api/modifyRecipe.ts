import axios from "axios";
import toast from "react-hot-toast";
import { Recipe } from "../models";

const modifyRecipe = async (recipe: Recipe) => {
    const response = await axios.patch(`http://localhost:8000/recipes/${recipe.id}/`, recipe);

    if (response.status !== 200) {
        toast.error("Failed to update recipe!");
        console.log(response);
        return [];
    }

    toast.success("Recipe updated successfully!");
    return response.data;
}

export default modifyRecipe;