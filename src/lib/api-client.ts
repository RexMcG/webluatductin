import axios from 'axios';

const getBaseUrl = () => {
  let url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    if (typeof window !== 'undefined' && (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('ductin'))) {
      url = 'https://webluat-backend.onrender.com';
    } else if (process.env.NODE_ENV === 'production') {
      url = 'https://webluat-backend.onrender.com';
    } else {
      url = 'http://localhost:3001';
    }
  }
  // Clean trailing slashes
  url = url.trim().replace(/\/+$/, '');
  // Auto-append /api/v1 if not present
  if (!url.endsWith('/api/v1')) {
    url = `${url}/api/v1`;
  }
  return url;
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Auto-attach Bearer token for admin routes
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token =
        sessionStorage.getItem('ductin_admin_token') ||
        localStorage.getItem('ductin_admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If 401 Unauthorized on admin page, clear invalid token
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      if (window.location.pathname.startsWith('/admin')) {
        sessionStorage.removeItem('ductin_admin_token');
        localStorage.removeItem('ductin_admin_token');
      }
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);
