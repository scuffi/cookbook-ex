from typing import Optional
from django.http import HttpRequest
from django.views.generic import View


# Create your views here.
class RecipeView(View):
    def get(self, request: HttpRequest, id: Optional[int] = None):
        ...
        
    def post(self, request: HttpRequest):
        ...
        
    def patch(self, request: HttpRequest, id: Optional[int] = None):
        ...
        
    def delete(self, request: HttpRequest, id: Optional[int] = None):
        ...