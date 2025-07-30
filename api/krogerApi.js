import axios from 'axios';
import sampleData from './data/krogerSample.json';

const TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';
const API_BASE = 'https://api.kroger.com/v1';

const CLIENT_ID = process.env.KROGER_CLIENT_ID;
const CLIENT_SECRET = process.env.KROGER_CLIENT_SECRET;

let cachedToken = null;
let tokenExpiration = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiration) {
    return cachedToken;
  }
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return null;
  }
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const resp = await axios.post(
      TOKEN_URL,
      params,
      {
        auth: { username: CLIENT_ID, password: CLIENT_SECRET },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );
    cachedToken = resp.data.access_token;
    tokenExpiration = Date.now() + resp.data.expires_in * 1000 - 60000;
    return cachedToken;
  } catch (err) {
    console.log('Error retrieving Kroger token', err);
    return null;
  }
}

export async function searchProducts(term, locationId, opts = {}) {
  if (!term) return [];
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('No token');
    const params = { 'filter.term': term, 'filter.locationId': locationId, ...opts };
    const resp = await axios.get(`${API_BASE}/products`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    return resp.data?.data || [];
  } catch (err) {
    console.log('Error fetching Kroger products, using sample data', err);
    return sampleData.products.filter(p =>
      p.description.toLowerCase().includes(term.toLowerCase())
    );
  }
}

export async function getProduct(productId, locationId) {
  try {
    const token = await getAccessToken();
    if (!token) throw new Error('No token');
    const params = locationId ? { locationId } : {};
    const resp = await axios.get(`${API_BASE}/products/${productId}`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    });
    return resp.data?.data;
  } catch (err) {
    console.log('Error fetching Kroger product', err);
    return sampleData.products.find(p => p.productId === productId);
  }
}

