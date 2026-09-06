import axios from 'axios';

// Create the Axios instance
const api = axios.create({
    baseURL: 'https://localhost:7065/api', // Match your ASP.NET Core port
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Global Error / Interceptor Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global API errors here (e.g., 401 Unauthorized, 500 Server Error)
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;