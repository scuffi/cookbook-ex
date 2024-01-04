from typing import Dict, Any

from django.db import models


# Create your models here.
class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    recipe = models.ForeignKey(
        "Recipe", related_name="ingredients", on_delete=models.CASCADE
    )


class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    icon = models.CharField(max_length=1, null=True)
    description = models.TextField()

    def serialise(self) -> Dict[str, Any]:
        """
        The `serialise` function returns a dictionary representation of a Recipe in a dictionary format, including its id, name,
        description, and a list of ingredients.

        Returns:
            a dict representation of a Recipe object.
        """
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "icon": self.icon,
            "ingredients": [
                {"name": ingredient.name} for ingredient in self.ingredients.all()
            ],
        }
