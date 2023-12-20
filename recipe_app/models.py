from django.db import models

# Create your models here.
class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    recipe = models.ForeignKey('Recipe', related_name='ingredients', on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.name
    
class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    
    def __str__(self) -> str:
        return self.name
    
    def serialise(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'ingredients': [{'name': ingredient.name} for ingredient in self.ingredients.all()],
            }