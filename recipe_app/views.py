import json

from typing import Optional, List, Dict

from django.http import HttpRequest
from django.http import JsonResponse
from django.http import Http404
from django.db import transaction
from django.db.models import QuerySet

from rest_framework.views import APIView

# Not stable for production, but makes testing easier
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, IngredientSerializer


# Make the view exempt from CSRF checks
# ! Not secure, just used for testing purposes
@method_decorator(csrf_exempt, name="dispatch")
class RecipeView(APIView):
    """
    RecipeView is a view in a Django application that handles GET, POST, PATCH, and DELETE requests.

    It acts as a CRUD API to interact with Recipes and their associated Ingredients.
    """

    def _handle_get_by_id(self, id: int) -> Recipe:
        """
        The function `_handle_get_by_id` retrieves a `Recipe` object from the database based on its ID, and
        raises a `Http404` exception if the recipe does not exist.

        Args:
          id (int): The `id` parameter is an integer that represents the unique identifier of a recipe. It
        is used to retrieve a specific recipe from the database.

        Returns:
          a Recipe object.
        """
        try:
            return Recipe.objects.get(id=id)
        except Recipe.DoesNotExist:
            raise Http404("Recipe does not exist")

    def _handle_get_all(self, query_params: Dict) -> QuerySet[Recipe]:
        """
        The function `_handle_get_all` returns a generator that yields serialized recipe objects based on a
        query parameter.

        Args:
          query (str): The `query` parameter is a string that represents the search query. It is used to
        filter the recipes based on their name. If the `query` is `None`, it means that all recipes should
        be returned without any filtering.

        Returns:
          a generator that yields dictionaries. The dictionaries represent serialized recipe objects. If the
        query parameter is None, the generator will yield serialized representations of all Recipe objects
        in the database. If the query parameter is not None, the generator will yield serialized
        representations of Recipe objects that have a name containing the query string (case-insensitive).
        """
        if query_params:
            return Recipe.objects.filter(
                **{f"{key}__icontains": value for key, value in query_params.items()}
            )

        return Recipe.objects.all()

    def get(self, request: HttpRequest, id: Optional[int] = None) -> JsonResponse:
        """
        Function that handles GET requests, either returning all objects or a
        specific object based on the provided ID.

        Args:
          request (HttpRequest): The `request` parameter is an instance of the `HttpRequest` class, which
        represents an HTTP request made by a client to the server. It contains information about the
        request, such as the HTTP method (GET, POST, etc.), headers, and query parameters.
          id (Optional[int]): The `id` parameter is an optional integer that represents the unique
        identifier of an object. If an `id` is provided, the function will retrieve the object with that
        specific `id`. If `id` is not provided, the function will retrieve all objects that match the query
        parameter `name`

        Returns:
          The code is returning a JsonResponse object. If no `id` is passed, it returns a
        JsonResponse containing a list of all recipes. If the `id`parameter is passed, it
        returns a JsonResponse containing a single Recipe object specified by `id`.
        """
        if id is None:
            return JsonResponse(
                RecipeSerializer(
                    self._handle_get_all(query_params=request.GET.dict()), many=True
                ).data,
                safe=False,
            )

        return JsonResponse(
            RecipeSerializer(self._handle_get_by_id(id)).data, safe=False
        )

    @transaction.atomic
    def post(self, request: HttpRequest) -> JsonResponse:
        """
        Function that handles POST requests, for creating a new recipe and its associated ingredients based
        on the request body.

        Args:
          request (HttpRequest): The `request` parameter is an instance of the `HttpRequest` class, which
        represents an HTTP request made to the server. It contains information about the request, such as
        the HTTP method (GET, POST, etc.), headers, and body.

        Returns:
          JsonResponse object of the created Recipe object.
        """
        body = json.loads(request.body.decode("utf-8"))

        if "name" not in body or "description" not in body or "ingredients" not in body:
            return JsonResponse(
                {"error": "Invalid request body, include all keys"},
                status=400,
                safe=False,
            )

        created_recipe = Recipe.objects.create(
            name=body["name"], description=body["description"]
        )

        for ingredient_data in body["ingredients"]:
            Ingredient.objects.create(
                name=ingredient_data["name"], recipe=created_recipe
            )
        return JsonResponse(created_recipe.serialise(), status=201)

    def patch(self, request: HttpRequest, id: int) -> JsonResponse:
        """
        Function to handle PATCH requests. The function updates a recipe object with new data provided in the request body and returns the
        updated recipe as a JSON response.

        Args:
          request (HttpRequest): An instance of the HttpRequest class, which represents an HTTP request made
        by a client.
          id (int): The `id` parameter is an integer that represents the unique identifier of a recipe. It
        is used to retrieve the recipe from the database and update its properties.

        Returns:
          a JsonResponse object with the updated Recipe object.
        """
        recipe = self._handle_get_by_id(id)
        body = json.loads(request.body.decode("utf-8"))

        if "name" in body:
            recipe.name = body["name"]

        if "description" in body:
            recipe.description = body["description"]

        if "ingredients" in body:
            recipe.ingredients.all().delete()
            for ingredient_data in body["ingredients"]:
                Ingredient.objects.create(name=ingredient_data["name"], recipe=recipe)

        recipe.save()

        return JsonResponse(recipe.serialise())

    def delete(self, request: HttpRequest, id: int) -> JsonResponse:
        """
        Function to handle DELETE requesrs. The function deletes a recipe with the given ID and returns a
        JSON response with a success message.

        Args:
          request (HttpRequest): HttpRequest object that represents the HTTP request made by the client.
          id (int): The `id` parameter is an integer that represents the unique identifier of the recipe
        that needs to be deleted.

        Returns:
          a JsonResponse object.
        """
        recipe = self._handle_get_by_id(id)
        recipe.delete()
        return JsonResponse({"message": f"Deleted '{recipe.name}'"}, status=200)
