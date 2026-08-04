import { useState } from 'react'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  // TODO: POST /api/admin/login -> store token (Laravel Sanctum)
  return <div>{/* login form */}</div>
}
