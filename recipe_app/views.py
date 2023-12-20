from typing import Optional
from django.http import HttpRequest
from django.views.generic import View

from django.http import JsonResponse


# Create your views here.
class RecipeView(View):
    def get(self, request: HttpRequest, id: Optional[int] = None):
        return JsonResponse({})
        
    def post(self, request: HttpRequest):
        return JsonResponse({})
        
    def patch(self, request: HttpRequest, id: Optional[int] = None):
        return JsonResponse({})
        
    def delete(self, request: HttpRequest, id: Optional[int] = None):
        return JsonResponse({})