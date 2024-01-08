import styled from 'styled-components';
import { Recipe } from '../models';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        setRecipeState(recipe ? recipe : {
            name: "",
            description: "",
            icon: "🍔",
            ingredients: []
        } as Recipe);
        }, [recipe]);

    const setAttribute = (attribute: string, value: any) => {
        setRecipeState(prevState => ({...prevState, [attribute]: value}));
    }

    const handleSubmit = (event: any) => {
    }

    return (
        <form>
            <h1 style={{fontSize: "3rem"}}>{recipe ? "Edit" : "Create"} a recipe</h1>
            <Label>Recipe name</Label>
            <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                <Input required value={recipeState.name} onChange={(name) => setAttribute("name", name.target.value)}/>
                <IconSelector onChange={(icon) => setAttribute("icon", icon)}>{recipeState.icon}</IconSelector>
            </div>
            <Label>Recipe description</Label>
            <Input required size={50} multiple value={recipeState.description} onChange={(description) => setAttribute("description", description.target.value)}/>
            <Label>Ingredients</Label>
            <IngredientForm ingredients={recipeState.ingredients} onChange={(ingredients) => setAttribute("ingredients", ingredients)}/>
            <SuccessButton type='submit'>{recipe ? "Update" : "Create"} recipe</SuccessButton>
        </form>
    );
}