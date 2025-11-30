import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // req.headers.authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('token');
      // Optionally redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const todoApi = {
  getAllTodo: async () => api.get('/todos/'),
  getTodoById: async (id) => api.get(`/todos/${id}`),
  addTodo: async (data) => {
    const token = localStorage.getItem('token');

    // Creating a new axios instance for file uploads
    const fileUploadApi = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return fileUploadApi.post('/todos/add', data);
  },
  updateTodo: async (id, data) => api.patch(`/todos/update/${id}`, data),
  deleteTodo: async (id) => api.delete(`/todos/delete/${id}`),
};

export const authApi = {
  login: async (credentials) => {
    // Remove any existing token before login
    localStorage.removeItem('token');
    const response = await api.post('/users/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  register: async (credentials) => {
    localStorage.removeItem('token');
    const response = await api.post('/users/register', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  getMe: async () => api.get('/users/auth/me'),
  updateProfile: async () => api.patch('/users/profile'),
  deleteAccount: async () => api.patch('/users/delete'),
};

export const userApi = {
  getAllUser: async () => api.get('/users'),
  searchUser: async (query) => api.get(`/users/search?q=${query}`),
  getProfile: async (userId) => api.get(`/users/${userId}/profile`),
};

export default api;
