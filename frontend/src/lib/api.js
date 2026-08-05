import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach admin token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const client = {
  auth: {
    login: async () => {
      // TODO: wire up real login flow
      throw new Error('Not implemented');
    },
  },
  entities: {
    audit_requests: {
      create: async ({ data }) => {
        const res = await api.post('/audit-requests', data);
        return res.data;
      },
    },
    leads: {
      create: async ({ data }) => {
        const res = await api.post('/leads', data);
        return res.data;
      },
    },
    result_cards: {
      query: async ({ query, limit }) => {
        const res = await api.get('/result-cards', { params: { limit } });
        return res.data;
      },
    },
  },
};

export default api;
