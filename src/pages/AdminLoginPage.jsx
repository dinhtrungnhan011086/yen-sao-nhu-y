import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function AdminLoginPage() {
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const success = await login(username, password)

    if (success) {
      navigate(searchParams.get('redirect') || '/quan-tri', { replace: true })
      return
    }

    setError('Thông tin đăng nhập không đúng.')
    setIsSubmitting(false)
  }

  return (
    <main className="section top-spaced admin-page">
      <div className="container admin-login-wrap">
        <section className="admin-header-card admin-login-card">
          <p className="section-kicker">Khu vực quản trị</p>
          <h1>Đăng nhập Admin</h1>
          <p className="section-description">
            Chỉ tài khoản quản trị mới có thể xem và chỉnh sửa nội dung trong trang quản trị.
          </p>

          <form className="order-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <span>Tên đăng nhập</span>
                <input value={username} onChange={(event) => setUsername(event.target.value)} required />
              </label>
              <label>
                <span>Mật khẩu</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
            </div>

            <button className="button button-primary" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>

            {error ? <p className="form-status error">{error}</p> : null}
          </form>
        </section>
      </div>
    </main>
  )
}