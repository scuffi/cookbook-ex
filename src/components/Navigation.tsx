import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchRecipes } from "../api";
import { RecipeContext } from "../context";
import { ConfirmButton } from "./Button";
import { NavigationPanel } from "./NavigationPanel";

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
  const { recipes, setRecipes } = useContext(RecipeContext);

  useEffect(() => {
    fetchRecipes().then(setRecipes);
  }, [setRecipes]);

  return (
    <Sidebar>
      <Link data-testid="nav-create-btn" to={"/create"}>
        <ConfirmButton>+ New Recipe</ConfirmButton>
      </Link>
      <Divider />
      <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Recipes</p>
      <div style={{ marginLeft: "20px" }}>
        {recipes.map((recipe) => NavigationPanel(recipe))}
      </div>
    </Sidebar>
  );
}
