import { useEffect, useMemo, useState } from 'react'
import { useAdminAuth } from '../context/AdminAuthContext'
import { useSiteContent } from '../context/SiteContentContext'

function cloneData(value) {
  return JSON.parse(JSON.stringify(value))
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function createNewProduct() {
  return {
    id: `san-pham-${Date.now()}`,
    slug: `san-pham-${Date.now()}`,
    name: 'Sản phẩm mới',
    category: 'Danh mục mới',
    price: '0đ',
    size: 'Quy cách',
    rating: '5.0/5',
    badge: 'Mới',
    imageUrl: '',
    imageAlt: 'Ảnh sản phẩm mới',
    summary: 'Mô tả ngắn cho sản phẩm.',
    hero: 'Điểm nhấn nổi bật của sản phẩm.',
    benefits: ['Lợi ích 1', 'Lợi ích 2', 'Lợi ích 3'],
    ingredients: 'Thành phần sản phẩm.',
    usage: 'Hướng dẫn sử dụng sản phẩm.',
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Không thể đọc tệp ảnh.'))
    reader.readAsDataURL(file)
  })
}

export default function AdminPage() {
  const { logout } = useAdminAuth()
  const { siteContent, setSiteContent, resetSiteContent } = useSiteContent()
  const [draft, setDraft] = useState(() => cloneData(siteContent))
  const [status, setStatus] = useState('')

  useEffect(() => {
    setDraft(cloneData(siteContent))
  }, [siteContent])

  const productCountLabel = useMemo(
    () => `${draft.products.length} sản phẩm đang được cấu hình`,
    [draft.products.length],
  )

  function updateStoreField(field, value) {
    setDraft((current) => ({
      ...current,
      store: {
        ...current.store,
        [field]: value,
      },
    }))
  }

  function updateHomeField(field, value) {
    setDraft((current) => ({
      ...current,
      home: {
        ...current.home,
        [field]: value,
      },
    }))
  }

  function updateHomeHighlights(value) {
    setDraft((current) => ({
      ...current,
      home: {
        ...current.home,
        highlights: value
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean),
      },
    }))
  }

  function updateProductField(index, field, value) {
    setDraft((current) => {
      const nextProducts = current.products.map((product, productIndex) => {
        if (productIndex !== index) {
          return product
        }

        const nextProduct = {
          ...product,
          [field]: value,
        }

        if (field === 'name') {
          nextProduct.slug = slugify(value) || product.slug
        }

        return nextProduct
      })

      return {
        ...current,
        products: nextProducts,
      }
    })
  }

  function updateProductBenefits(index, value) {
    setDraft((current) => ({
      ...current,
      products: current.products.map((product, productIndex) =>
        productIndex === index
          ? {
              ...product,
              benefits: value
                .split('\n')
                .map((item) => item.trim())
                .filter(Boolean),
            }
          : product,
      ),
    }))
  }

  async function handleProductImageUpload(index, file) {
    if (!file) {
      return
    }

    try {
      const imageDataUrl = await readFileAsDataUrl(file)
      updateProductField(index, 'imageUrl', imageDataUrl)
      setStatus('Ảnh sản phẩm đã được tải lên. Nhớ bấm Lưu thay đổi để áp dụng.')
    } catch {
      setStatus('Không thể tải ảnh lên. Vui lòng thử lại với tệp ảnh khác.')
    }
  }

  function addProduct() {
    setDraft((current) => ({
      ...current,
      products: [...current.products, createNewProduct()],
    }))
    setStatus('')
  }

  function removeProduct(index) {
    setDraft((current) => {
      if (current.products.length === 1) {
        return current
      }

      return {
        ...current,
        products: current.products.filter((_, productIndex) => productIndex !== index),
      }
    })
    setStatus('')
  }

  function saveChanges() {
    setSiteContent(cloneData(draft))
    setStatus('Nội dung đã được lưu trên trình duyệt này.')
  }

  function restoreDefaults() {
    resetSiteContent()
    setStatus('Đã khôi phục nội dung mặc định.')
  }

  return (
    <main className="section top-spaced admin-page">
      <div className="container admin-layout">
        <div className="admin-header-card">
          <p className="section-kicker">Quản trị nội dung</p>
          <h1>Chỉnh sửa sản phẩm và thông tin cửa hàng</h1>
          <p className="section-description">
            Trang này lưu dữ liệu bằng localStorage, nên thay đổi chỉ có hiệu lực trên trình duyệt hiện tại.
            Nếu muốn quản trị thật trên production, bước tiếp theo nên là thêm Supabase hoặc Firebase.
          </p>
          <div className="admin-toolbar">
            <button className="button button-primary" type="button" onClick={saveChanges}>
              Lưu thay đổi
            </button>
            <button className="button button-ghost" type="button" onClick={restoreDefaults}>
              Khôi phục mặc định
            </button>
            <button className="button button-ghost" type="button" onClick={logout}>
              Đăng xuất
            </button>
            <span className="admin-meta">{productCountLabel}</span>
          </div>
          {status ? <p className="form-status success">{status}</p> : null}
        </div>

        <section className="admin-card">
          <div className="admin-card-heading">
            <h2>Thông tin cửa hàng</h2>
            <p>Chỉnh sửa tên thương hiệu, hotline, email và địa chỉ hiển thị trên website.</p>
          </div>
          <div className="admin-grid">
            <label>
              <span>Tên cửa hàng</span>
              <input value={draft.store.brandName} onChange={(event) => updateStoreField('brandName', event.target.value)} />
            </label>
            <label>
              <span>Tagline</span>
              <input value={draft.store.tagline} onChange={(event) => updateStoreField('tagline', event.target.value)} />
            </label>
            <label>
              <span>Số điện thoại</span>
              <input value={draft.store.phone} onChange={(event) => updateStoreField('phone', event.target.value)} />
            </label>
            <label>
              <span>Email</span>
              <input value={draft.store.email} onChange={(event) => updateStoreField('email', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>Mô tả thương hiệu</span>
              <textarea rows="3" value={draft.store.description} onChange={(event) => updateStoreField('description', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>Địa chỉ showroom ngắn</span>
              <input value={draft.store.showroom} onChange={(event) => updateStoreField('showroom', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>Địa chỉ chi tiết</span>
              <input value={draft.store.address} onChange={(event) => updateStoreField('address', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>Giờ phục vụ</span>
              <input value={draft.store.hours} onChange={(event) => updateStoreField('hours', event.target.value)} />
            </label>
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-heading">
            <h2>Nội dung trang chủ</h2>
            <p>Điều chỉnh nhanh các câu chữ chính nếu muốn giọng thương hiệu mềm hơn hoặc sang hơn.</p>
          </div>
          <div className="admin-grid">
            <label className="field-span-2">
              <span>Nhãn mở đầu</span>
              <input value={draft.home.kicker} onChange={(event) => updateHomeField('kicker', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>Tiêu đề hero</span>
              <textarea rows="2" value={draft.home.title} onChange={(event) => updateHomeField('title', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>Mô tả hero</span>
              <textarea rows="4" value={draft.home.description} onChange={(event) => updateHomeField('description', event.target.value)} />
            </label>
            <label>
              <span>Con số nổi bật</span>
              <input value={draft.home.statsValue} onChange={(event) => updateHomeField('statsValue', event.target.value)} />
            </label>
            <label>
              <span>Nhãn số liệu</span>
              <input value={draft.home.statsLabel} onChange={(event) => updateHomeField('statsLabel', event.target.value)} />
            </label>
            <label className="field-span-2">
              <span>3 điểm nổi bật, mỗi dòng một ý</span>
              <textarea rows="4" value={draft.home.highlights.join('\n')} onChange={(event) => updateHomeHighlights(event.target.value)} />
            </label>
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-card-heading admin-card-heading-row">
            <div>
              <h2>Sản phẩm</h2>
              <p>Cập nhật tên, giá, mô tả, ảnh, thành phần và lợi ích của từng sản phẩm.</p>
            </div>
            <button className="button button-ghost" type="button" onClick={addProduct}>
              Thêm sản phẩm
            </button>
          </div>

          <div className="admin-products">
            {draft.products.map((product, index) => (
              <article className="admin-product-card" key={product.id}>
                <div className="admin-product-header">
                  <h3>{product.name || `Sản phẩm ${index + 1}`}</h3>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() => removeProduct(index)}
                    disabled={draft.products.length === 1}
                  >
                    Xóa
                  </button>
                </div>
                <div className="admin-grid">
                  <label>
                    <span>Tên sản phẩm</span>
                    <input value={product.name} onChange={(event) => updateProductField(index, 'name', event.target.value)} />
                  </label>
                  <label>
                    <span>Slug</span>
                    <input value={product.slug} onChange={(event) => updateProductField(index, 'slug', event.target.value)} />
                  </label>
                  <label>
                    <span>Danh mục</span>
                    <input value={product.category} onChange={(event) => updateProductField(index, 'category', event.target.value)} />
                  </label>
                  <label>
                    <span>Ảnh sản phẩm (URL)</span>
                    <input
                      placeholder="/products/yen-sao-01.jpg hoặc https://..."
                      value={product.imageUrl || ''}
                      onChange={(event) => updateProductField(index, 'imageUrl', event.target.value)}
                    />
                  </label>
                  <label>
                    <span>Mô tả ảnh</span>
                    <input
                      value={product.imageAlt || ''}
                      onChange={(event) => updateProductField(index, 'imageAlt', event.target.value)}
                    />
                  </label>
                  <label className="field-span-2">
                    <span>Tải ảnh từ máy</span>
                    <input
                      accept="image/*"
                      className="admin-file-input"
                      type="file"
                      onChange={(event) => handleProductImageUpload(index, event.target.files?.[0])}
                    />
                  </label>
                  {product.imageUrl ? (
                    <div className="admin-image-preview field-span-2">
                      <img src={product.imageUrl} alt={product.imageAlt || product.name} />
                      <button
                        className="button button-ghost"
                        type="button"
                        onClick={() => updateProductField(index, 'imageUrl', '')}
                      >
                        Xóa ảnh hiện tại
                      </button>
                    </div>
                  ) : null}
                  <label>
                    <span>Giá</span>
                    <input value={product.price} onChange={(event) => updateProductField(index, 'price', event.target.value)} />
                  </label>
                  <label>
                    <span>Quy cách</span>
                    <input value={product.size} onChange={(event) => updateProductField(index, 'size', event.target.value)} />
                  </label>
                  <label>
                    <span>Đánh giá</span>
                    <input value={product.rating} onChange={(event) => updateProductField(index, 'rating', event.target.value)} />
                  </label>
                  <label className="field-span-2">
                    <span>Badge</span>
                    <input value={product.badge} onChange={(event) => updateProductField(index, 'badge', event.target.value)} />
                  </label>
                  <label className="field-span-2">
                    <span>Mô tả ngắn</span>
                    <textarea rows="3" value={product.summary} onChange={(event) => updateProductField(index, 'summary', event.target.value)} />
                  </label>
                  <label className="field-span-2">
                    <span>Mô tả chi tiết</span>
                    <textarea rows="3" value={product.hero} onChange={(event) => updateProductField(index, 'hero', event.target.value)} />
                  </label>
                  <p className="admin-help field-span-2">
                    Gợi ý: nếu ảnh nằm trong thư mục public, chỉ cần nhập đường dẫn như
                    /products/yen-sao-01.jpg. Nếu dùng ảnh ngoài, dán URL đầy đủ https://... hoặc tải trực tiếp từ máy bằng ô bên trên.
                  </p>
                  <p className="admin-help field-span-2">
                    Lưu ý: ảnh tải trực tiếp sẽ được lưu trong localStorage của trình duyệt này, nên không phù hợp với tệp quá lớn.
                  </p>
                  <label className="field-span-2">
                    <span>Lợi ích, mỗi dòng một ý</span>
                    <textarea rows="4" value={product.benefits.join('\n')} onChange={(event) => updateProductBenefits(index, event.target.value)} />
                  </label>
                  <label className="field-span-2">
                    <span>Thành phần</span>
                    <textarea rows="2" value={product.ingredients} onChange={(event) => updateProductField(index, 'ingredients', event.target.value)} />
                  </label>
                  <label className="field-span-2">
                    <span>Hướng dẫn sử dụng</span>
                    <textarea rows="2" value={product.usage} onChange={(event) => updateProductField(index, 'usage', event.target.value)} />
                  </label>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}