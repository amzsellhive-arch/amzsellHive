import axios from 'axios';
import { submitLead, submitAudit } from '../services/leadService';
import { getResultCards } from '../services/cmsService';

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
      throw new Error('Use authApi.login from lib/auth.js');
    },
  },
  entities: {
    audit_requests: {
      create: async ({ data }) => {
        const res = await submitAudit(data);
        return res.data;
      },
    },
    leads: {
      create: async ({ data }) => {
        const res = await submitLead(data);
        return res.data;
      },
    },
    result_cards: {
      query: async ({ query, limit } = {}) => {
        const res = await getResultCards();
        return res.data;
      },
    },
  },
};

export default api;
