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

const setAuthHeaders = (token) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const todoApi = {
  getAllTodo: async (token) => api.get('/', setAuthHeaders(token)),
  getTodoById: async (id, token) => api.get(`/${id}`, setAuthHeaders(token)),
  addTodo: async (data, token) => api.post('/add', data, setAuthHeaders(token)),
  updateTodo: async (id, data, token) =>
    api.patch(`/update/${id}`, data, setAuthHeaders(token)),
  deleteTodo: async (id, token) =>
    api.delete(`/delete/${id}`, setAuthHeaders(token)),
};

export const authApi = {
  login: async (credentials) => {
    // Remove any existing token before login
    localStorage.removeItem('token');
    return api.post('/users/login', credentials);
  },
  register: async (credentials) => {
    localStorage.removeItem('token');
    return api.post('/users/register', credentials);
  },
  getMe: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('no token found');
    }
    return api.get('/users/auth/me', setAuthHeaders(token));
  },
};

export const userApi = {
  getAllUser: async () => {},
  searchUser: async () => {},
  getProfile: async () => {},
  updateProfile: async () => {},
  deleteAccount: async () => {},
};

export default api;
