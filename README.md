# Yen Sao Hoang Kim

Website React + Vite cho thuong hieu yen sao cao cap, ngôn ngữ tiếng Việt, phù hợp deploy tĩnh lên Cloudflare Pages.

## Tinh nang

- Trang chu mang phong cach premium cho brand yen sao
- Trang danh sach san pham
- Trang chi tiet san pham theo route dong
- Trang lien he/dat hang
- Form gui don qua EmailJS, khong can backend
- Responsive cho mobile va desktop

## Cong nghe

- React
- Vite
- React Router
- EmailJS Browser SDK

## Cai dat

```bash
npm install
npm run dev
```

## Cau hinh EmailJS

Tao file `.env` tu `.env.example` va dien gia tri that:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

EmailJS template nen nhan cac field sau:

- `customer_name`
- `customer_phone`
- `customer_address`
- `product_name`
- `quantity`
- `notes`

## Build production

```bash
npm run build
```

Thu muc output: `dist`

## Deploy len Cloudflare Pages

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variables: them 3 bien `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

File `public/_redirects` da duoc them de Cloudflare Pages phuc vu dung cho cac route SPA nhu `/san-pham/...` va `/lien-he`.