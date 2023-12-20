from django.shortcuts import render
from django.views.generic import View

# Create your views here.
class RecipeView(View):
    def get(self, request):
        return render(request, 'recipe_app/recipe.html', {})