import api from './api'

// Public - fetch page content for rendering
export const getPageContent = (slug) => api.get(`/pages/${slug}`)

// Admin - update page content
export const updatePageSection = (slug, sectionKey, content) =>
  api.put(`/admin/pages/${slug}/${sectionKey}`, { content })
