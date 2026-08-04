import { useState } from 'react'
import { submitAudit } from '../../services/leadService'

export default function AuditForm() {
  const [form, setForm] = useState({
    name: '', brand: '', email: '', revenue: '', marketplace: '', problem: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: call submitAudit(form) -> POST /api/audit-requests
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: name, brand, email, revenue, marketplace, problem fields */}
    </form>
  )
}
