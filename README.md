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

## Synced Storage

The `storage/` directory contains `syncedStorage.js` which stores data locally using AsyncStorage and periodically backs it up to a remote endpoint. The module automatically pulls user credentials from `useStore` to include with sync requests. Call `startSync()` after login to begin the process.
