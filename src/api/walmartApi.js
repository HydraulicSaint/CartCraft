import axios from 'axios';
import sampleData from './data/walmartSample.json';

const API_BASE = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2';
const API_KEY = process.env.WALMART_API_KEY;

// Search for products by query string using Walmart's public API.
// Returns an array of items with price information.
export async function searchProducts(query, opts = {}) {
  if (!query) return [];
  try {
    const params = { query, apiKey: API_KEY, format: 'json', ...opts };
    const resp = await axios.get(`${API_BASE}/search`, { params });
    if (resp.data?.items) {
      return resp.data.items;
    }
    if (resp.data?.searchItemCollection?.items) {
      return resp.data.searchItemCollection.items;
    }
    return resp.data || [];
  } catch (err) {
    console.log('Error fetching Walmart products, using sample data', err);
    return sampleData.items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }
}

// Retrieve a single product by item ID.
export async function getProduct(itemId) {
  try {
    const params = { apiKey: API_KEY, format: 'json' };
    const resp = await axios.get(`${API_BASE}/items/${itemId}`, { params });
    return resp.data;
  } catch (err) {
    console.log('Error fetching Walmart product', err);
    return sampleData.items.find(item => item.itemId === itemId);
  }
}
