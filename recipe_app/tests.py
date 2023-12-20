from django.test import TestCase
from .models import Recipe, Ingredient


# Create your tests here.
class RecipeViewTestCase(TestCase):
    def setUp(self):
        self.recipes = [
            {
                "id": 1,
                "name": "Pizza",
                "description": "Put it in the oven",
                "ingredients": [
                    {"name": "dough"},
                    {"name": "cheese"},
                    {"name": "tomato"},
                ],
            },
            {
                "id": 2,
                "name": "Caprese",
                "description": "...is a salad",
                "ingredients": [
                    {"name": "mozzerella"},
                    {"name": "tomato"},
                    {"name": "basil"},
                    {"name": "oil"},
                ],
            },
        ]

        for recipe in self.recipes:
            created_recipe = Recipe.objects.create(
                name=recipe["name"], description=recipe["description"]
            )

            for ingredient_data in recipe["ingredients"]:
                Ingredient.objects.create(
                    name=ingredient_data["name"], recipe=created_recipe
                )

    # * Test cases for GET requests
    def test_get_recipe_list(self):
        response = self.client.get("/recipes/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
        self.assertEqual(response.json(), self.recipes)

    def test_get_recipe_by_id(self):
        response = self.client.get("/recipes/1/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.recipes[0])

    def test_get_recipe_by_id_not_found(self):
        response = self.client.get("/recipes/100/")
        self.assertEqual(response.status_code, 404)

    def test_get_recipe_by_search(self):
        response = self.client.get("/recipes/?name=Pi")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json(), [self.recipes[0]])

    def test_get_recipe_by_search_empty(self):
        response = self.client.get("/recipes/?name=chicken")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    # * Test cases for POST requests
    def test_create_recipe(self):
        data = {
            "name": "Hamburger",
            "description": "Grill it",
            "ingredients": [
                {"name": "bun"},
                {"name": "lettuce"},
                {"name": "patty"},
                {"name": "sauce"},
            ],
        }
        response = self.client.post(
            "/recipes/", data=data, content_type="application/json"
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["id"], 3)
        self.assertEqual(Recipe.objects.count(), 3)
        self.assertEqual(Ingredient.objects.count(), 11)
        self.assertEqual(Recipe.objects.get(id=3).serialise(), response.json())

    def test_create_recipe_invalid(self):
        data = {
            "name": "Fake Hamburger",
            "description": "Grill it",
        }
        response = self.client.post(
            "/recipes/", data=data, content_type="application/json"
        )

        self.assertEqual(response.status_code, 400)

        # Check it didn't create a recipe
        self.assertEqual(Recipe.objects.count(), 2)

    def test_create_recipe_no_body(self):
        response = self.client.post("/recipes/", content_type="application/json")

        self.assertEqual(response.status_code, 400)

        # Check it didn't create a recipe
        self.assertEqual(Recipe.objects.count(), 2)

    # * Test cases for PATCH requests

    def test_modify_recipe_name(self):
        response = self.client.patch(
            "/recipes/1/",
            data={"name": "la pizza", "description": "Do you have a pizza oven?"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["name"], "la pizza")
        self.assertEqual(response.json()["description"], "Do you have a pizza oven?")
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertEqual(Ingredient.objects.count(), 7)
        self.assertEqual(Recipe.objects.get(id=1).serialise(), response.json())

    def test_modify_recipe_ingredients(self):
        response = self.client.patch(
            "/recipes/1/",
            data={
                "ingredients": [
                    {"name": "pineapple"},
                    {"name": "ham"},
                ]
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["ingredients"]), 2)
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertEqual(Ingredient.objects.count(), 6)
        self.assertEqual(Recipe.objects.get(id=1).serialise(), response.json())

    def test_modify_recipe_invalid(self):
        response = self.client.patch(
            "/recipes/1/",
            data={"no_exist": "hello"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertEqual(Ingredient.objects.count(), 7)
        self.assertEqual(Recipe.objects.get(id=1).serialise(), response.json())

        # Check that it didn't modify the original recipe
        self.assertEqual(Recipe.objects.get(id=1).serialise(), self.recipes[0])

    def test_modify_recipe_not_found(self):
        response = self.client.patch(
            "/recipes/100/",
            data={"name": "Mac and Cheese"},
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertEqual(Ingredient.objects.count(), 7)

    def test_modify_recipe_no_id(self):
        self.assertRaises(
            TypeError,
            self.client.patch,
            "/recipes/",
            data={"name": "Mac and Cheese"},
            content_type="application/json",
        )

    # * Test cases for DELETE requests

    def test_delete_recipe(self):
        response = self.client.delete("/recipes/2/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(Recipe.objects.count(), 1)
        self.assertEqual(Ingredient.objects.count(), 3)

    def test_delete_recipe_not_found(self):
        response = self.client.delete("/recipes/100/")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(Recipe.objects.count(), 2)
        self.assertEqual(Ingredient.objects.count(), 7)

    def test_delete_recipe_no_id(self):
        self.assertRaises(
            TypeError,
            self.client.delete,
            "/recipes/",
        )

    # * Test relationships between Recipe and Ingredient

    def test_one_recipe_to_one_ingredient(self):
        pizza_recipe = Recipe.objects.get(id=1)
        caprese_recipe = Recipe.objects.get(id=2)

        # Check that the recipes have the correct number of ingredients
        self.assertEqual(caprese_recipe.ingredients.count(), 4)
        self.assertEqual(pizza_recipe.ingredients.count(), 3)

        dough_ingredient = Ingredient.objects.get(name="dough")

        dough_ingredient.recipe = caprese_recipe
        dough_ingredient.save()
        caprese_recipe.save()

        # Check that the dough has been reassigned
        self.assertEqual(dough_ingredient.recipe, caprese_recipe)

        # Check that the recipes have the correct number of ingredients after reassignment
        self.assertEqual(caprese_recipe.ingredients.count(), 5)
        self.assertEqual(pizza_recipe.ingredients.count(), 2)
