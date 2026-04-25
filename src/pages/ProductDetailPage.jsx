import { Link, useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useSiteContent } from '../context/SiteContentContext'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { siteContent } = useSiteContent()
  const product = siteContent.products.find((item) => item.slug === slug)

  if (!product) {
    return (
      <main className="section top-spaced">
        <div className="container simple-panel">
          <h1>Không tìm thấy sản phẩm</h1>
          <Link className="button button-primary" to="/san-pham">
            Quay lại danh mục
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="section top-spaced">
      <div className="container detail-layout">
        <div className="detail-visual">
          <div className="detail-bottle-cluster">
            {product.imageUrl ? (
              <img
                className="detail-product-image"
                src={product.imageUrl}
                alt={product.imageAlt || product.name}
              />
            ) : (
              <>
                <div className="hero-bottle tall" />
                <div className="hero-bottle short" />
              </>
            )}
          </div>
          <div className="detail-price-box">
            <p>{product.category}</p>
            <strong>{product.price}</strong>
            <span>{product.size}</span>
          </div>
        </div>

        <div className="detail-copy">
          <SectionTitle
            kicker={product.badge}
            title={product.name}
            description={product.hero}
          />

          <div className="detail-facts">
            <p>
              <strong>Thành phần:</strong> {product.ingredients}
            </p>
            <p>
              <strong>Hướng dẫn sử dụng:</strong> {product.usage}
            </p>
            <p>
              <strong>Đánh giá:</strong> {product.rating}
            </p>
          </div>

          <div className="benefit-list">
            {product.benefits.map((benefit) => (
              <div key={benefit} className="benefit-item">
                {benefit}
              </div>
            ))}
          </div>

          <div className="detail-actions">
            <Link className="button button-primary" to={`/lien-he?product=${product.slug}`}>
              Đặt sản phẩm này
            </Link>
            <Link className="button button-ghost" to="/san-pham">
              Xem thêm sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}