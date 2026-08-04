import { createContext, useState, useContext } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  // TODO: login/logout logic, persist token
  return <AuthContext.Provider value={{ admin, setAdmin }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
