import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { RecipeContext } from "./context";
import { Recipe } from "./models";
import { Create } from "./routes/Create";
import { Edit } from "./routes/Edit";

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <BrowserRouter>
      <RecipeContext.Provider value={{ recipes, setRecipes }}>
        <div>
          <Toaster />
        </div>
        <div style={{ display: "flex" }}>
          <Navigation />
          <div>
            <Route path="/recipe/:recipeId">
              <Edit />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </div>
        </div>
      </RecipeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
