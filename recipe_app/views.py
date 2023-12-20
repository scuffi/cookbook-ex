import json

from typing import Optional, Generator

from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import View
from django.db import transaction

# Not stable for production, but makes testing easier
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Recipe, Ingredient


# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class RecipeView(View):
    
    def _handle_get_by_id(self, id: int) -> Recipe:
        return Recipe.objects.get(id=id)
    
    def _handle_get_all(self) -> Generator[dict, None, None]:
        return (recipe.serialise() for recipe in Recipe.objects.all())
    
    def get(self, request: HttpRequest, id: Optional[int] = None) -> JsonResponse:
        if id is None:
            return JsonResponse(list(self._handle_get_all()), safe=False)
        
        return JsonResponse(self._handle_get_by_id(id).serialise(), safe=False)
        
    @transaction.atomic
    def post(self, request: HttpRequest) -> JsonResponse:
        body = json.loads(request.body.decode('utf-8'))
        
        created_recipe = Recipe.objects.create(name=body['name'], description=body['description'])

        for ingredient_data in body['ingredients']:
            Ingredient.objects.create(name=ingredient_data['name'], recipe=created_recipe)

        return JsonResponse(created_recipe.serialise())
        
    def patch(self, request: HttpRequest, id: int) -> JsonResponse:
        return JsonResponse({})
        
    def delete(self, request: HttpRequest, id: int) -> JsonResponse:
        recipe = self._handle_get_by_id(id)
        recipe.delete()
        return JsonResponse({}, status=204)