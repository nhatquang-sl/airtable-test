import axios from 'axios';
import ENV from '@config';

const api = axios.create({
  baseURL: 'https://api.airtable.com',
  headers: { Authorization: `Bearer ${ENV.AIRTABLE_API_KEY}` },
});

export default api;
