import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAdminAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirectPath = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/dang-nhap-admin?redirect=${redirectPath}`} replace />
  }

  return children
}