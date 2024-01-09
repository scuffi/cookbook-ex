import axios from "axios";
import toast from "react-hot-toast";

/**
 * Function to fetch all recipes from the API.
 * @returns A list of all the Recipe objects from the API.
 */
const fetchRecipes = async () => {
    const response = await axios.get("http://localhost:8000/recipes");

    if (response.status !== 200) {
        toast.error("Failed to fetch recipes!");
        console.log(response);
        return [];
    }

    return response.data;
}

export default fetchRecipes;