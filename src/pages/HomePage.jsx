import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import { useSiteContent } from '../context/SiteContentContext'

export default function HomePage() {
  const { siteContent } = useSiteContent()
  const { home, products } = siteContent

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="section-kicker">{home.kicker}</p>
            <h1>{home.title}</h1>
            <p className="hero-description">{home.description}</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/san-pham">
                Khám phá bộ sưu tập
              </Link>
              <Link className="button button-ghost" to="/lien-he">
                Đặt hàng ngay
              </Link>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-bottle-group">
              <div className="hero-bottle tall" />
              <div className="hero-bottle short" />
              <div className="hero-orbit" />
            </div>
            <div className="hero-stats">
              <strong>{home.statsValue}</strong>
              <span>{home.statsLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container intro-grid">
          <SectionTitle
            kicker={home.introKicker}
            title={home.introTitle}
            description={home.introDescription}
          />

          <div className="highlight-list">
            {home.highlights.map((item) => (
              <article key={item} className="highlight-card">
                <span className="highlight-dot" />
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            kicker={home.featuredKicker}
            title={home.featuredTitle}
            description={home.featuredDescription}
          />

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cta">
        <div className="container cta-panel">
          <div>
            <p className="section-kicker">{home.ctaKicker}</p>
            <h2>{home.ctaTitle}</h2>
          </div>
          <Link className="button button-primary" to="/lien-he">
            {home.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  )
}