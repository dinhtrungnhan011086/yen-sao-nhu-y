import { useSearchParams } from 'react-router-dom'
import OrderForm from '../components/OrderForm'
import SectionTitle from '../components/SectionTitle'
import { useSiteContent } from '../context/SiteContentContext'

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const defaultProduct = searchParams.get('product')
  const { siteContent } = useSiteContent()
  const { contact, store } = siteContent

  return (
    <main className="section top-spaced">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionTitle
            kicker={contact.kicker}
            title={contact.title}
            description={contact.description}
          />

          <div className="contact-card-stack">
            <article className="contact-card">
              <h3>{contact.showroomTitle}</h3>
              <p>{store.address}</p>
            </article>
            <article className="contact-card">
              <h3>{contact.hotlineTitle}</h3>
              <p>{store.phone}</p>
            </article>
            <article className="contact-card">
              <h3>{contact.hoursTitle}</h3>
              <p>{store.hours}</p>
            </article>
          </div>
        </div>

        <div className="form-panel">
          <OrderForm defaultProduct={defaultProduct} />
        </div>
      </div>
    </main>
  )
}