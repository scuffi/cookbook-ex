import styled from "styled-components";
import { ConfirmButton } from "./Button";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavigationPanel } from "./NavigationPanel";
import { RecipeContext } from "../context";
import { fetchRecipes } from "../api";

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
      <Link to={"/create"}>
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
