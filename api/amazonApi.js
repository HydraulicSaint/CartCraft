import axios from 'axios';
import sampleData from './data/amazonSample.json';

const API_BASE = 'https://api.amazon.com/products';
const API_KEY = process.env.AMAZON_API_KEY;

// Search for products by query string using Amazon's public API.
// Returns an array of products with pricing details.
export async function searchProducts(query, opts = {}) {
  if (!query) return [];
  try {
    const params = { query, apiKey: API_KEY, ...opts };
    const resp = await axios.get(`${API_BASE}/search`, { params });
    if (resp.data?.products) {
      return resp.data.products;
    }
    return resp.data || [];
  } catch (err) {
    console.log('Error fetching Amazon products, using sample data', err);
    return sampleData.products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// Retrieve a single product by ASIN.
export async function getProduct(asin) {
  try {
    const params = { apiKey: API_KEY };
    const resp = await axios.get(`${API_BASE}/items/${asin}`, { params });
    return resp.data;
  } catch (err) {
    console.log('Error fetching Amazon product', err);
    return sampleData.products.find(p => p.asin === asin);
  }
}
