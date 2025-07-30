import axios from 'axios';
import upsellData from './data/upsellAds.json';

// Fetch upsell advertising offers.
// Attempts remote call first, falls back to bundled data if offline
export async function fetchUpsellAds(context = {}) {
  try {
    const resp = await axios.post('https://example.com/api/ads/upsell', { context });
    return resp.data.ads || [];
  } catch (err) {
    console.log('Remote ads unavailable, using local data', err);
    // Basic filtering by category when available
    if (context.category) {
      return upsellData.ads.filter(ad => ad.category === context.category);
    }
    return upsellData.ads;
  }
}
