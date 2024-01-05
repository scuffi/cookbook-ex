import React, { useState } from 'react';
import { Central } from '../components/Layout';
import { Input, Label } from '../components/Form';
import { SuccessButton } from '../components/Button';
import { IngredientForm } from '../components/IngredientForm';
import { Recipe } from '../models';
import { IconSelector } from '../components/IconSelector';

type Props = {
    recipe?: Recipe | null,
}

export function Create({ recipe }: Props) {
    const [recipeState, setRecipeState] = useState<Recipe>(recipe ? recipe : {
        name: "",
        description: "",
        icon: "🍔",
        ingredients: []
        } as Recipe);

    function setAttribute(attribute: string, value: any) {
        setRecipeState(prevState => ({...prevState, [attribute]: value}));
    }

    return (
        <Central>
            <div>
                <h1 style={{fontSize: "3rem"}}>Create a recipe</h1>
                <Label>Recipe name</Label>
                <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                    <Input required/>
                    <IconSelector icon={recipeState.icon} onChange={(icon) => setAttribute("icon", icon)}/>
                </div>
                <Label>Recipe description</Label>
                <Input required size={50} multiple/>
                <Label>Ingredients</Label>
                <IngredientForm ingredients={recipeState.ingredients} onChange={(ingredients) => setAttribute("ingredients", ingredients)}/>
                <SuccessButton>Create recipe</SuccessButton>
            </div>
        </Central>
    );
}