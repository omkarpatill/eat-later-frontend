const BASE_URL = 'http://127.0.0.1:5000';

export async function addRestaurant(data) {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add restaurant');
  }

  return res.json();
}

export async function getRestaurants(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/restaurants?${params}`);
  return res.json();
}
