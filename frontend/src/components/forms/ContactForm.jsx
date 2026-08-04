import { useState } from 'react'
import { submitLead } from '../../services/leadService'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', brand: '', topic: '', message: ''
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: call submitLead(form) -> POST /api/leads
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: name, email, brand, topic, message fields */}
    </form>
  )
}
