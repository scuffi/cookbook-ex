import json

from typing import Optional

from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import View
from django.forms.models import model_to_dict
from django.forms.models import modelform_factory

# Not stable for production, but makes testing easier
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import Recipe, Ingredient


# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class RecipeView(View):
    
    def _handle_get_by_id(self, id: int) -> JsonResponse:
        return JsonResponse(Recipe.objects.get(id=id).serialise())
    
    def _handle_get_all(self) -> JsonResponse:
        return JsonResponse([recipe.serialise() for recipe in Recipe.objects.all()], safe=False)
    
    def get(self, request: HttpRequest, id: Optional[int] = None):
        if id is None:
            return self._handle_get_all()
        
        return self._handle_get_by_id(id)
        
    def post(self, request: HttpRequest):
        body = json.loads(request.body.decode('utf-8'))
        
        created_recipe = Recipe.objects.create(name=body['name'], description=body['description'])

        for ingredient_data in body['ingredients']:
            Ingredient.objects.create(name=ingredient_data['name'], recipe=created_recipe)

        return JsonResponse(created_recipe.serialise())
        
    def patch(self, request: HttpRequest, id: int):
        return JsonResponse({})
        
    def delete(self, request: HttpRequest, id: int):
        return JsonResponse({})