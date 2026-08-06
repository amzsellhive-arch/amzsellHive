import axios from 'axios'

const api = axios.create({
  // Use relative /api so requests route through the Vite dev proxy to the
  // Laravel backend — avoids CORS entirely in development.
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach admin token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
