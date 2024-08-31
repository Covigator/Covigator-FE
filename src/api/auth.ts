import axios from 'axios';

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post('/api/login', data);
  return response.data;
};
