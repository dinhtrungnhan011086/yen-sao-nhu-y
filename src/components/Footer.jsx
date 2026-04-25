import { useSiteContent } from '../context/SiteContentContext'

export default function Footer() {
  const { siteContent } = useSiteContent()
  const { store } = siteContent

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="section-kicker">{store.brandName}</p>
          <h3>{store.description}</h3>
        </div>
        <div>
          <p>Hotline: {store.phone}</p>
          <p>Email: {store.email}</p>
          <p>Showroom: {store.showroom}</p>
        </div>
      </div>
    </footer>
  )
}