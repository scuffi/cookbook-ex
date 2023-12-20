from django.urls import path

from .views import RecipeView

urlpatterns = [
    path('recipes/<int:id>', RecipeView.as_view(), name='recipes'),
]
