import axios from 'axios';

// Ensure the backend port is 3004 as started by the user!
export const API_URL = 'http://localhost:3004';

// Setup global axios instance that automatically sends HttpOnly cookies
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
