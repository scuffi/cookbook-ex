import json

from typing import Optional

from django.http import HttpRequest
from django.http import JsonResponse
from django.views.generic import View
from django.forms.models import model_to_dict

from .models import Recipe


# Create your views here.
class RecipeView(View):
    
    def _handle_get_by_id(self, id: int) -> JsonResponse:
        return JsonResponse(model_to_dict(Recipe.objects.get(id=id)))
    
    def _handle_get_all(self) -> JsonResponse:
        return JsonResponse([model_to_dict(recipe) for recipe in Recipe.objects.all()], safe=False)
    
    def get(self, request: HttpRequest, id: Optional[int] = None):
        if id is None:
            return self._handle_get_all()
        
        return self._handle_get_by_id(id)
        
    def post(self, request: HttpRequest):
        body = json.loads(request.body.decode('utf-8'))
        
        created_recipe = Recipe.objects.create(**body)
        
        return JsonResponse(model_to_dict(created_recipe))
        
    def patch(self, request: HttpRequest, id: int):
        return JsonResponse({})
        
    def delete(self, request: HttpRequest, id: int):
        return JsonResponse({})