import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:8000/api
  headers: { 'Content-Type': 'application/json' },
})

// Attach admin token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
