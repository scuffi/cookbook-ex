import json

from typing import Optional, Generator

from django.http import HttpRequest
from django.http import JsonResponse
from django.http import Http404
from django.views.generic import View
from django.db import transaction

# Not stable for production, but makes testing easier
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Recipe, Ingredient


# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class RecipeView(View):
    def _handle_get_by_id(self, id: int) -> Recipe:
        try:
            return Recipe.objects.get(id=id)
        except Recipe.DoesNotExist:
            raise Http404("Recipe does not exist")

    def _handle_get_all(self, query: str) -> Generator[dict, None, None]:
        if query is None:
            return (recipe.serialise() for recipe in Recipe.objects.all())
        return (
            recipe.serialise()
            for recipe in Recipe.objects.filter(name__icontains=query)
        )

    def get(self, request: HttpRequest, id: Optional[int] = None) -> JsonResponse:
        if id is None:
            return JsonResponse(
                list(self._handle_get_all(query=request.GET.get("name", None))),
                safe=False,
            )

        return JsonResponse(self._handle_get_by_id(id).serialise(), safe=False)

    @transaction.atomic
    def post(self, request: HttpRequest) -> JsonResponse:
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
        recipe = self._handle_get_by_id(id)
        recipe.delete()
        return JsonResponse({}, status=204)
