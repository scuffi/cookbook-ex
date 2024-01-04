import styled from "styled-components";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewButton = styled(Button)`
    background-color: #059e00;
    border: 1px solid #008502;
    color: white;
    font-weight: bold;
    width: 100%;
`;

const NavButton = styled.button`
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

const Sidebar = styled.div`
    width: 25rem;
    height: 100vh;
    background-color: #eee;
    padding: 1rem;
`;

const Divider = styled.hr`
    border-top: 1px solid #d4d4d4;
    margin: 1rem 0;
`;

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

export function Navigation() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/recipes")
            .then(response => setRecipes(response.data))
            .catch(error => console.error(error));
    }, []);
 
    return (
        <Sidebar>
            <Link to={"/create"}><NewButton>+ New Recipe</NewButton></Link>
            <Divider />
            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Recipes</p>
            <div style={{marginLeft: "20px"}}>
                {recipes.map(recipe => (
                    <div key={recipe['id']}>
                        <NavButton>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <RecipeIcon>{recipe['icon']}</RecipeIcon>
                                <div style={{ marginLeft: "10px" }}>
                                    <RecipeName>{recipe['name']}</RecipeName>
                                    <RecipeDescription>{recipe['description']}</RecipeDescription>
                                </div>
                            </div>
                        </NavButton>
                    </div>
                ))}
            </div>
        </Sidebar>
    );
}