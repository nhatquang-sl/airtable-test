import axios from 'axios';

export const sidebarWidth = 240;
export const API_ENDPOINT = 'http://localhost:3500';
export const apiService = axios.create({
  baseURL: API_ENDPOINT,
});
