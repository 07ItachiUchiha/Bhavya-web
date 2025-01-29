import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Check if it's an admin route
        if (config.url.startsWith('/admin')) {
            const adminToken = localStorage.getItem('adminToken');
            if (adminToken) {
                config.headers.Authorization = `Bearer ${adminToken}`;
            }
        } else {
            const userToken = localStorage.getItem('token');
            if (userToken) {
                config.headers.Authorization = `Bearer ${userToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add request interceptor for debugging
api.interceptors.request.use(
    config => {
        console.log('API Request:', {
            method: config.method,
            url: config.url,
            data: config.data,
            params: config.params
        });
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.data);
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Clear tokens if unauthorized
            if (error.config.url.startsWith('/admin')) {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
            } else {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else if (error.code === 'ERR_NETWORK') {
            console.error('Network error - Is the backend server running?');
            console.error('Server URL:', process.env.REACT_APP_API_URL);
        } else if (error.response) {
            console.error('Response error:', error.response.data);
        } else {
            console.error('Error:', error);
        }
        console.error('API Error:', {
            message: error.message,
            response: error.response?.data
        });
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('API Response:', response.data);
        return response;
    },
    error => {
        console.error('API Error:', {
            message: error.message,
            response: error.response?.data
        });
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials),
    verifyToken: () => api.get('/auth/verify'),
    adminVerify: () => api.get('/admin/verify')
};

export default api;