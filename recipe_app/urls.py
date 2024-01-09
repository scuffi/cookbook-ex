from django.urls import path

from .views import RecipeView

urlpatterns = [
    path("", RecipeView.as_view(), name="recipes"),
    path("<int:id>/", RecipeView.as_view(), name="spec_recipes"),
]
