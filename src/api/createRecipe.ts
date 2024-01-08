import axios from "axios";
import { Recipe } from "../models";
import toast from "react-hot-toast";

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