import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://unsito-api.flaisgrafics.com/api',
    //baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',

    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle 401 errors (token expired)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si el token expiró (401), limpiar localStorage y redirigir al login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirigir al login inmediatamente
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default apiClient;

