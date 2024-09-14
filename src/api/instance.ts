import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      localStorage.getItem('accessToken') &&
      `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export default instance;
