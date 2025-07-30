import axios from 'axios';
import { getRecipes } from './recipeApi';

// Search for recipes that can be made with the provided ingredients.
// Attempts to query the remote API first and falls back to local data
// if the network request fails.
export async function searchRecipesByIngredients(ingredients = []) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return [];
  }

  try {
    const resp = await axios.post('https://example.com/api/recipes/search', {
      ingredients,
    });
    return resp.data.recipes || [];
  } catch (err) {
    console.log('Remote recipe search failed, using local data', err);
    const all = await getRecipes();
    const normalized = ingredients.map((i) => i.toLowerCase());
    return all.filter((rec) =>
      normalized.every((ing) =>
        rec.ingredients.map((r) => r.toLowerCase()).includes(ing)
      )
    );
  }
}
