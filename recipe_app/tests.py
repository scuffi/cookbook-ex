from django.test import TestCase

# Create your tests here.
class RecipeViewTestCase(TestCase):
    
    # * Test cases for GET requests
    def test_get_recipe_by_id(self):
        response = self.client.get('/recipes/1/')
        self.assertEqual(response.status_code, 200)
        
    def test_get_recipe_by_id_not_found(self):
        response = self.client.get('/recipes/100/')
        self.assertEqual(response.status_code, 200)
        
    def test_get_recipe_by_search(self):
        response = self.client.get('/recipes/?search=chicken')
        self.assertEqual(response.status_code, 200)
        
    def test_get_recipe_by_search_empty(self):
        response = self.client.get('/recipes/?search=chicken')
        self.assertEqual(response.status_code, 200)
        
    # * Test cases for POST requests
    def test_create_recipe(self):
        ...
        
    def test_create_recipe_invalid(self):
        ...
    
    # * Test cases for PATCH requests
    
    def test_modify_recipe(self):
        ...
        
    def test_modify_recipe_invalid(self):
        ...
        
    def test_modify_recipe_not_found(self):
        ...
    
    # * Test cases for DELETE requests
    
    def test_delete_recipe(self):
        ...
        
    def test_delete_recipe_not_found(self):
        ...