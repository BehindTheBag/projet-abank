import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

export const loginUser = async (email, password) => {
  const response = await API.post('/user/login', { email, password });
  return response.data;
};

export const getUserProfile = async (token) => {
  const response = await API.post('/user/profile', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};