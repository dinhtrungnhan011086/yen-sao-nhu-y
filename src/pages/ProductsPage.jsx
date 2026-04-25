import ProductCard from '../components/ProductCard'
import SectionTitle from '../components/SectionTitle'
import { useSiteContent } from '../context/SiteContentContext'

export default function ProductsPage() {
  const { siteContent } = useSiteContent()
  const { products, productsPage } = siteContent

  return (
    <main className="section top-spaced">
      <div className="container">
        <SectionTitle
          kicker={productsPage.kicker}
          title={productsPage.title}
          description={productsPage.description}
        />

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}