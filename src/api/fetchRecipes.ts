import axios from "axios";
import toast from "react-hot-toast";
import { Recipe } from "../models";

const fetchRecipes = async (setRecipes: (recipes: Recipe[]) => void) => {
    axios.get("http://localhost:8000/recipes")
        .then(response => setRecipes(response.data))
        .catch(error => {
            toast.error("Failed to load recipes!");
            console.error(error);
        });
}

export default fetchRecipes;