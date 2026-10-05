import api from './api';

// Public
export const getPosts = (params = {}) => api.get('/blog', { params });
export const getPost = (slug) => api.get(`/blog/${encodeURIComponent(slug)}`);

// Admin
export const adminGetPosts = () => api.get('/admin/blog');
export const adminGetPost = (id) => api.get(`/admin/blog/${id}`);
export const adminCreatePost = (data) => api.post('/admin/blog', data);
export const adminUpdatePost = (id, data) => api.put(`/admin/blog/${id}`, data);
export const adminDeletePost = (id) => api.delete(`/admin/blog/${id}`);

// Image upload (multipart) — returns { url }
export const uploadImage = (file) => {
  const fd = new FormData();
  fd.append('file', file);
  return api.post('/admin/media', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
};
