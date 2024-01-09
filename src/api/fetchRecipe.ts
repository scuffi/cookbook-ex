import axios from "axios";
import toast from "react-hot-toast";

const fetchRecipe = async (id: string) => {
    const response = await axios.get(`http://localhost:8000/recipes/${id}`);

    if (response.status !== 200) {
        toast.error("Failed to fetch recipe!");
        console.log(response);
    }

    return response.data;
}

export default fetchRecipe;