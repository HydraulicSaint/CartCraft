// Local content API for development/testing
// Loads static JSON files that mimic remote API responses.

import appContent from './data/appContent.json';

// Simulated async fetch with small delay
export async function getAppContent() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(appContent), 200);
  });
}

export async function getSplashText() {
  const content = await getAppContent();
  return content.splashText;
}
