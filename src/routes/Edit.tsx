import { Central } from '../components/Layout';
import { RecipeForm } from '../components/Form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Recipe } from '../models';


interface Params {
    recipeId: string;
}

export function Edit() {
    const { recipeId } = useParams<Params>();
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        axios.get(`http://localhost:8000/recipes/${recipeId}`)
            .then(response => setRecipe(response.data as Recipe))
            .catch(error => console.error(error));
    }
    , [recipeId]);

    console.log(recipe);

    return (
        <Central>
            {recipe ? 
                <RecipeForm recipe={recipe}/>
                : 
                <h1>Loading...</h1>
            }
        </Central>
    );
}