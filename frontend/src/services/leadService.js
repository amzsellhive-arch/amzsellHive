import api from './api'

// Public - client-facing forms
export const submitLead = (data) => api.post('/leads', data)
export const submitAudit = (data) => api.post('/audit-requests', data)

// Admin - protected
export const getLeads = () => api.get('/admin/leads')
export const updateLeadStatus = (id, status) => api.patch(`/admin/leads/${id}`, { status })
export const deleteLead = (id) => api.delete(`/admin/leads/${id}`)

// Admin - audit requests
export const getAuditRequests = () => api.get('/admin/audit-requests')
export const deleteAuditRequest = (id) => api.delete(`/admin/audit-requests/${id}`)

// Admin - dashboard
export const getDashboard = () => api.get('/admin/dashboard')
