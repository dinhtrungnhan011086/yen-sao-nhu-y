import { Link, NavLink } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useSiteContent } from '../context/SiteContentContext'

export default function Header() {
  const { siteContent } = useSiteContent()
  const { isAuthenticated, logout } = useAdminAuth()

  const navItems = [
    { to: '/', label: 'Trang chủ' },
    { to: '/san-pham', label: 'Sản phẩm' },
    { to: '/lien-he', label: 'Đặt hàng' },
  ]

  if (isAuthenticated) {
    navItems.push({ to: '/quan-tri', label: 'Quản trị' })
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand-mark" to="/">
          <span className="brand-monogram">YK</span>
          <span>
            <strong>{siteContent.store.brandName}</strong>
            <small>{siteContent.store.tagline}</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <button className="nav-action" onClick={logout} type="button">
              Thoát quản trị
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  )
}