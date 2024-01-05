import styled from 'styled-components';
import { Recipe } from '../models';
import { useState } from 'react';
import { IconSelector } from './IconSelector';
import { IngredientForm } from './IngredientForm';
import { SuccessButton } from './Button';

export const Label = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
`;

export const Input = styled.input`
    font-size: 1rem;
    font-family: inherit;
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    box-shadow: 0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);
    background-color: white;
    line-height: 1.5;
    margin: 0;
`;

type Props = {
    recipe?: Recipe | null,
}

export function RecipeForm({ recipe }: Props) {
    const [recipeState, setRecipeState] = useState<Recipe>(recipe ? recipe : {
        name: "",
        description: "",
        icon: "🍔",
        ingredients: []
        } as Recipe);

    const setAttribute = (attribute: string, value: any) => {
        setRecipeState(prevState => ({...prevState, [attribute]: value}));
    }

    return (
        <div>
            <h1 style={{fontSize: "3rem"}}>{recipe ? "Update" : "Create"} a recipe</h1>
            <Label>Recipe name</Label>
            <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                <Input required defaultValue={recipeState.name}/>
                <IconSelector icon={recipeState.icon} onChange={(icon) => setAttribute("icon", icon)}/>
            </div>
            <Label>Recipe description</Label>
            <Input required size={50} multiple defaultValue={recipeState.description}/>
            <Label>Ingredients</Label>
            <IngredientForm ingredients={recipeState.ingredients} onChange={(ingredients) => setAttribute("ingredients", ingredients)}/>
            <SuccessButton>{recipe ? "Update" : "Create"} recipe</SuccessButton>
        </div>
    );
}