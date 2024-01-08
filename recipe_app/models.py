from typing import Dict, Any
import emoji

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError


def validate_icon(icon: str):
    """
    Check if a given string is a single, valid emoji.

    Args:
      icon (str): The `icon` parameter is a string that represents an emoji icon.

    Returns:
        True if the string is a valid emoji, otherwise raises a ValidationError.
    """
    if emoji.is_emoji(icon) is False:
        raise ValidationError(
            _("%(icon)s is not a valid emoji"),
            params={"icon": icon},
        )

    return True


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
    icon = models.CharField(max_length=1, null=True, validators=[validate_icon])
    description = models.TextField()
