import axios from "axios";
import toast from "react-hot-toast";

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