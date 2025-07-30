# CartCraft

Lightweight scaffolding for a React Native app using Expo.

## Tech Stack

- **Frontend:** React Native with Expo
- **State Management:** Zustand (Context API as backup)
- **API Calls:** Axios or Fetch to interact with GPT / recipe APIs
- **Storage:** AsyncStorage locally, Supabase or Firebase for cloud storage
- **AI:** GPT-4 / OpenAI API with future local inference
- **UI Kit:** NativeWind (Tailwind-style) or React Native Paper
- **Deployment:** EAS Build via Expo to App Store and Play Store
- **Dev Pipeline:** GitHub repo with Expo Go for live preview testing

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm start
   ```

This repo currently contains minimal scaffolding to kick off development. Add screens and components under the `components` directory and stores under `store`.

## Local Content API

The `api/` directory includes a simple content API used during development. It loads JSON files from `api/data/` to mimic server responses. Use `getSplashText` or `getAppContent` from `api/contentApi.js` to access this data.

### Local Recipe API
`api/recipeApi.js` works the same way for recipes, returning data from `api/data/recipes.json`. In production this module will call the Spoonacular API instead of local JSON files.

### Walmart Product API
`api/walmartApi.js` retrieves product listings and prices from the Walmart API. When the remote service is unavailable, it returns sample results from `api/data/walmartSample.json`. Set the `WALMART_API_KEY` environment variable to enable live queries.
### Recipe Search
Use `searchRecipesByIngredients()` from `api/recipeSearch.js` to find recipes that can be made with ingredients you have available. The function attempts to query a remote endpoint and falls back to filtering the local recipe data when offline.

## Meal Plans

Plan meals using the `useMealPlans` store and display them over different time
periods with the `MealPlanViewer` component. Supported periods are per meal, per
day, per week and per year.
=======
## Synced Storage

The `storage/` directory contains `syncedStorage.js` which stores data locally using AsyncStorage and periodically backs it up to a remote endpoint. The module automatically pulls user credentials from `useStore` to include with sync requests. Call `startSync()` after login to begin the process.

## Advertiser Integration

The `advertising/` directory provides `adsApi.js` and bundled JSON data used to pull sponsored upsell suggestions. Use the `useUpsellAds` store to load offers that can be shown alongside recommendations from your decision engine.

## License

This project is provided for learning or licensed use only. See [LICENSE](LICENSE) for details.

