import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        <span className="product-badge">{product.badge}</span>
        {product.imageUrl ? (
          <img
            className="product-image"
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
          />
        ) : (
          <div className="product-bottle" />
        )}
      </div>
      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p>{product.summary}</p>
        <div className="product-meta">
          <span>{product.size}</span>
          <span>{product.price}</span>
        </div>
        <div className="product-actions">
          <Link className="text-link" to={`/san-pham/${product.slug}`}>
            Xem chi tiết
          </Link>
          <Link className="button button-ghost" to={`/lien-he?product=${product.slug}`}>
            Đặt hàng
          </Link>
        </div>
      </div>
    </article>
  )
}