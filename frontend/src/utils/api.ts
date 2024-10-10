import axios from 'axios';

export const serverApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL + '/api/v1',
});
