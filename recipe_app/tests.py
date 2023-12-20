from django.test import TestCase
from .models import Recipe, Ingredient


# Create your tests here.
class RecipeViewTestCase(TestCase):
    def setUp(self):
        recipes = [
            {
                "name": "Pizza",
                "description": "Put it in the oven",
                "ingredients": [
                    {"name": "dough"},
                    {"name": "cheese"},
                    {"name": "tomato"},
                ],
            },
            {
                "name": "Lasagna",
                "description": "Put it in the oven",
                "ingredients": [
                    {"name": "pasta"},
                    {"name": "cheese"},
                    {"name": "beef"},
                    {"name": "sauce"},
                ],
            },
        ]

        for recipe in recipes:
            created_recipe = Recipe.objects.create(
                name=recipe["name"], description=recipe["description"]
            )

            for ingredient_data in recipe["ingredients"]:
                Ingredient.objects.create(
                    name=ingredient_data["name"], recipe=created_recipe
                )

    # * Test cases for GET requests
    def test_get_recipe_list(self):
        response = self.client.get("/recipes")
        self.assertEqual(response.status_code, 200)

    def test_get_recipe_by_id(self):
        response = self.client.get("/recipes/1/")
        self.assertEqual(response.status_code, 200)

    def test_get_recipe_by_id_not_found(self):
        response = self.client.get("/recipes/100/")
        self.assertEqual(response.status_code, 200)

    def test_get_recipe_by_search(self):
        response = self.client.get("/recipes/?name=chicken")
        self.assertEqual(response.status_code, 200)

    def test_get_recipe_by_search_empty(self):
        response = self.client.get("/recipes/?name=chicken")
        self.assertEqual(response.status_code, 200)

    # * Test cases for POST requests
    def test_create_recipe(self):
        ...

    def test_create_recipe_invalid(self):
        ...

    # * Test cases for PATCH requests

    def test_modify_recipe(self):
        ...

    def test_modify_recipe_invalid(self):
        ...

    def test_modify_recipe_not_found(self):
        ...

    def test_modify_recipe_no_id(self):
        ...

    # * Test cases for DELETE requests

    def test_delete_recipe(self):
        ...

    def test_delete_recipe_not_found(self):
        ...

    def test_delete_recipe_no_id(self):
        ...
