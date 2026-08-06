import api from './api';

export const authApi = {
  // POST /api/admin/login -> { token, user }
  login: async ({ email, password }) => {
    const res = await api.post('/admin/login', { email, password });
    const { token, user } = res.data;
    if (token) localStorage.setItem('admin_token', token);
    if (user) localStorage.setItem('admin_user', JSON.stringify(user));
    return user;
  },
  // GET /api/admin/me -> { user }
  getCurrentUser: async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) return null;
    try {
      const res = await api.get('/admin/me');
      return res.data.user;
    } catch (err) {
      // Token might be invalid/expired
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      throw err;
    }
  },
  // POST /api/admin/logout
  logout: async () => {
    try {
      await api.post('/admin/logout');
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  },
};

export default authApi;
