import api from './api'

// Public - fetch page content for rendering
export const getPageContent = (slug) => api.get(`/pages/${slug}`)

// Public - result cards & testimonials
export const getResultCards = () => api.get('/result-cards')
export const getTestimonials = () => api.get('/testimonials')

// Admin - update page content
export const updatePageSection = (slug, sectionKey, content) =>
  api.put(`/admin/pages/${slug}/${sectionKey}`, { content })

export const getAdminPages = () => api.get('/admin/pages')
export const deletePageSection = (slug, sectionKey) =>
  api.delete(`/admin/pages/${slug}/${sectionKey}`)

// Admin - result cards
export const createResultCard = (data) => api.post('/admin/result-cards', data)
export const updateResultCard = (id, data) => api.put(`/admin/result-cards/${id}`, data)
export const deleteResultCard = (id) => api.delete(`/admin/result-cards/${id}`)

// Admin - testimonials
export const createTestimonial = (data) => api.post('/admin/testimonials', data)
export const updateTestimonial = (id, data) => api.put(`/admin/testimonials/${id}`, data)
export const deleteTestimonial = (id) => api.delete(`/admin/testimonials/${id}`)
