import styled from "styled-components";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavigationPanel } from "./NavigationPanel";

const NewButton = styled(Button)`
    background-color: #059e00;
    border: 1px solid #008502;
    color: white;
    font-weight: bold;
    width: 100%;
`;

const Sidebar = styled.div`
    width: 20rem;
    height: 100vh;
    background-color: #eee;
    padding: 1rem;
`;

const Divider = styled.hr`
    border-top: 1px solid #d4d4d4;
    margin: 1rem 0;
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
                    NavigationPanel(recipe)
                ))}
            </div>
        </Sidebar>
    );

    
}