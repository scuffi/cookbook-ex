import axios from "axios";
import toast from "react-hot-toast";
import config from "../config";

/**
 * Function to fetch a specific Recipe from the API.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of a
 * recipe.
 * @returns The function `fetchRecipe` returns a Recipe object from the response if the status is 200
 */
const fetchRecipe = async (id: string) => {
    const response = await axios.get(`${config.api.url}${id}`);

    if (response.status !== 200) {
        toast.error("Failed to fetch recipe!");
        console.log(response);
        return;
    }

    return response.data;
}

export default fetchRecipe;