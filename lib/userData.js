// lib/userData.js
import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function makeRequest(method, endpoint, body = null) {
  const token = getToken();
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    }
  };
  if (body) options.body = JSON.stringify(body);
  
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (res.ok) {
    return await res.json();
  } else {
    return [];
  }
}

// Favourites functions
export async function addToFavourites(id) {
  return await makeRequest('PUT', `/api/user/favourites/${id}`);
}

export async function removeFromFavourites(id) {
  return await makeRequest('DELETE', `/api/user/favourites/${id}`);
}

export async function getFavourites() {
  return await makeRequest('GET', `/api/user/favourites`);
}

// History functions
export async function addToHistory(id) {
  return await makeRequest('PUT', `/api/user/history/${id}`);
}

export async function removeFromHistory(id) {
  return await makeRequest('DELETE', `/api/user/history/${id}`);
}

export async function getHistory() {
  return await makeRequest('GET', `/api/user/history`);
}
