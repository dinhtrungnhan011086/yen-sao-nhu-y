import { createContext, useContext, useMemo, useState } from 'react'

const ADMIN_SESSION_KEY = 'yen-sao-admin-session'
const ADMIN_USERNAME_HASH = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'
const ADMIN_PASSWORD_HASH = '4bef46763ff49bdc1555a0f7a9eafd347673cbff5c145630b796faaedcb2d692'

const AdminAuthContext = createContext(null)

function readSessionState() {
  try {
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated'
  } catch {
    return false
  }
}

async function sha256(value) {
  const buffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSessionState())

  const value = useMemo(
    () => ({
      isAuthenticated,
      login: async (username, password) => {
        const [usernameHash, passwordHash] = await Promise.all([
          sha256(username.trim()),
          sha256(password),
        ])

        const isValid =
          usernameHash === ADMIN_USERNAME_HASH && passwordHash === ADMIN_PASSWORD_HASH

        if (isValid) {
          window.sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated')
          setIsAuthenticated(true)
        }

        return isValid
      },
      logout: () => {
        window.sessionStorage.removeItem(ADMIN_SESSION_KEY)
        setIsAuthenticated(false)
      },
    }),
    [isAuthenticated],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }

  return context
}