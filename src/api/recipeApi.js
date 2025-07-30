// Local recipe API for development/testing
// Loads static JSON files that mimic remote API responses.

import recipes from './data/recipes.json';

export async function getRecipes() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(recipes), 200);
  });
}

export async function getRecipe(id) {
  const all = await getRecipes();
  return all.find((r) => r.id === id);
}
