import emailjs from '@emailjs/browser'
import { useEffect, useMemo, useState } from 'react'
import { useSiteContent } from '../context/SiteContentContext'

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

function createEmptyForm(products) {
  return {
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    product_name: products[0]?.name ?? '',
    quantity: 1,
    notes: '',
  }
}

export default function OrderForm({ defaultProduct }) {
  const { siteContent } = useSiteContent()
  const products = siteContent.products
  const recipientEmail = siteContent.store.email

  const emptyForm = useMemo(() => createEmptyForm(products), [products])

  const initialProductName = useMemo(() => {
    const matched = products.find((product) => product.slug === defaultProduct)
    return matched ? matched.name : emptyForm.product_name
  }, [defaultProduct, emptyForm.product_name, products])

  const [formData, setFormData] = useState({
    ...emptyForm,
    product_name: initialProductName,
  })
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      product_name: initialProductName,
    }))
  }, [initialProductName])

  const hasEmailJsConfig =
    emailJsConfig.serviceId && emailJsConfig.templateId && emailJsConfig.publicKey

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: name === 'quantity' ? Number(value) : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!hasEmailJsConfig) {
      setStatus({
        type: 'error',
        message:
          'EmailJS chưa được cấu hình. Vui lòng thêm các biến môi trường để kích hoạt gửi đơn.',
      })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          ...formData,
          recipient_email: recipientEmail,
        },
        {
          publicKey: emailJsConfig.publicKey,
        },
      )

      setStatus({
        type: 'success',
        message: 'Đơn hàng đã được gửi. Chúng tôi sẽ liên hệ xác nhận trong ít phút.',
      })
      setFormData({
        ...emptyForm,
        product_name: initialProductName,
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Không thể gửi đơn lúc này. Vui lòng thử lại hoặc liên hệ hotline.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Họ và tên</span>
          <input
            name="customer_name"
            onChange={handleChange}
            placeholder="Nguyễn Thị Anh"
            required
            value={formData.customer_name}
          />
        </label>

        <label>
          <span>Số điện thoại</span>
          <input
            name="customer_phone"
            onChange={handleChange}
            placeholder="0909 123 456"
            required
            value={formData.customer_phone}
          />
        </label>

        <label className="field-span-2">
          <span>Địa chỉ giao hàng</span>
          <input
            name="customer_address"
            onChange={handleChange}
            placeholder="Số nhà, đường, phường, quận, tỉnh/thành"
            required
            value={formData.customer_address}
          />
        </label>

        <label>
          <span>Sản phẩm</span>
          <select name="product_name" onChange={handleChange} value={formData.product_name}>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Số lượng</span>
          <input
            min="1"
            name="quantity"
            onChange={handleChange}
            required
            type="number"
            value={formData.quantity}
          />
        </label>

        <label className="field-span-2">
          <span>Ghi chú</span>
          <textarea
            name="notes"
            onChange={handleChange}
            placeholder="Khung giờ giao hàng, yêu cầu xuất hóa đơn, thông điệp quà tặng..."
            rows="4"
            value={formData.notes}
          />
        </label>
      </div>

      <div className="form-note">
        <p>
          Đơn hàng sẽ được gửi qua EmailJS đến hộp thư quản trị. Cấu hình bằng các biến
          VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.
          Trong template EmailJS, đặt To Email là {{recipient_email}} để nhận theo email cấu hình trên website.
        </p>
      </div>

      <button className="button button-primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Đang gửi đơn...' : 'Gửi đơn đặt hàng'}
      </button>

      {!products.length ? (
        <p className="form-status error">Chưa có sản phẩm nào để đặt hàng. Vui lòng thêm sản phẩm trong trang quản trị.</p>
      ) : null}

      {status.message ? (
        <p className={status.type === 'success' ? 'form-status success' : 'form-status error'}>
          {status.message}
        </p>
      ) : null}
    </form>
  )
}