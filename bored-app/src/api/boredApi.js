// src/api/boredApi.js

const BASE_URL = '/api';

export async function getRandomActivity() {
  try {
    const res = await fetch(`${BASE_URL}/random`);
    if (!res.ok) throw new Error('Failed to fetch random activity');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function filterActivities({ type = '', participants = '' } = {}) {
  try {
    const query = new URLSearchParams();
    if (type) query.append('type', type);
    if (participants) query.append('participants', participants);

    const res = await fetch(`${BASE_URL}/filter?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch filtered activities');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getActivityByKey(key) {
  try {
    const res = await fetch(`${BASE_URL}/activity/${key}`);
    if (!res.ok) throw new Error('Failed to fetch activity by key');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
