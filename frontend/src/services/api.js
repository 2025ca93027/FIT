import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Workout API
export const workoutAPI = {
  getAll: () => api.get('/workouts'),
  getById: (id) => api.get(`/workouts/${id}`),
  create: (workout) => api.post('/workouts', workout),
  update: (id, workout) => api.put(`/workouts/${id}`, workout),
  delete: (id) => api.delete(`/workouts/${id}`),
  getByCategory: (category) => api.get(`/workouts/category/${category}`),
  getStats: (start, end) => api.get('/workouts/stats', { 
    params: { start, end } 
  }),
};

// Goal API
export const goalAPI = {
  getAll: () => api.get('/goals'),
  getById: (id) => api.get(`/goals/${id}`),
  create: (goal) => api.post('/goals', goal),
  update: (id, goal) => api.put(`/goals/${id}`, goal),
  delete: (id) => api.delete(`/goals/${id}`),
  getActive: () => api.get('/goals/active'),
  getByStatus: (status) => api.get(`/goals/status/${status}`),
};

export default api;
