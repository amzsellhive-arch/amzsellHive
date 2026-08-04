import { useEffect, useState } from 'react'
import { getLeads, updateLeadStatus } from '../services/leadService'

export default function LeadsTable() {
  const [leads, setLeads] = useState([])
  // TODO: fetch leads, show table with status dropdown: New -> Contact -> Booking -> Client
  return <div>{/* leads table */}</div>
}
