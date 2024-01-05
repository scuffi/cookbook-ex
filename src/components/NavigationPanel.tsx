import { NavLink } from "react-router-dom";
import styled from "styled-components";

const RecipeName = styled.p`
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0rem;
`;

const RecipeDescription = styled.p`
    font-size: 0.7rem;
    font-weight: 200;
    margin-top: 0rem;
`;

const RecipeIcon = styled.p`
    font-size: 2rem;
    margin: 0;
    padding: 0;
`;

const NavigationButton = styled.button`
    font-family: inherit;
    border: none;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    text-align: left;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.2);
    }
`;

type Recipe = {
    id: string,
    name: string,
    description: string,
    icon: string,
};

export function NavigationPanel(recipe: Recipe) {
    return <div key={recipe.id}>
        <NavLink to={`/recipe/${recipe.id}`} style={{ textDecoration: "none", color: "inherit" }} activeStyle={{backgroundColor: "rgba(0, 0, 0, 0.1)"}}>
            <NavigationButton>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <RecipeIcon>{recipe.icon}</RecipeIcon>
                    <div style={{ marginLeft: "10px" }}>
                        <RecipeName>{recipe.name}</RecipeName>
                        <RecipeDescription>{recipe.description}</RecipeDescription>
                    </div>
                </div>
            </NavigationButton>
        </NavLink>
    </div>;
}