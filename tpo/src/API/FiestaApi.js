// src/api/fiestaApi.js

const API_URL = 'http://localhost:8080/api/fiestas';

export const fetchFiestas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch fiestas');
  }
  return response.json();
};

export const fetchFiestaById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch fiesta');
  }
  return response.json();
};

export const createFiesta = async (fiesta) => {
  const response = await fetch(`${API_URL}/agregar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fiesta),
  });
  if (!response.ok) {
    throw new Error('Failed to create fiesta');
  }
  return response.json();
};

export const updateFiesta = async (id, fiesta) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fiesta),
  });
  if (!response.ok) {
    throw new Error('Failed to update fiesta');
  }
  return response.json();
};

export const deleteFiesta = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete fiesta');
  }
  return response.text();
};

export const descountStockParty = async (id, quantity) => {
  const response = await fetch(`${API_URL}/${id}/descountStock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    throw new Error('Failed to descount party stock');
  }
  return response.json();
};
