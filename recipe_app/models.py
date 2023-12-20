from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=255, primary_key=True)
    recipe = models.ForeignKey('Recipe', related_name='ingredients', on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.name
    
class Recipe(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    
    def __str__(self) -> str:
        return self.name