import { createInitialProducts } from './products'

export const STORAGE_KEY = 'yen-sao-hoang-kim-site-content'
export const STORAGE_VERSION = 2

export const defaultSiteContent = {
  store: {
    brandName: 'Yến Sào Như Ý',
    tagline: 'Tinh hoa bồi dưỡng thượng lưu',
    description:
      'Thương hiệu yến sào cao cấp dành cho quà tặng và chăm sóc sức khỏe.',
    phone: '0909 888 168',
    email: 'concierge@yensaohk.vn',
    showroom: '68 Nguyễn Huệ, Quận 1, TP. HCM',
    address: '68 Nguyễn Huệ, Bến Nghé, Quận 1, TP. HCM',
    hours: '08:30 - 20:30, Thứ Hai đến Chủ Nhật',
  },
  home: {
    kicker: 'Thương hiệu chăm sóc sức khỏe cao cấp',
    title: 'Yến sào cao cấp cho những khoảnh khắc chăm sóc thật quý giá.',
    description:
      'Yến Sào Hoàng Kim tuyển chọn nguồn yến chất lượng, kết hợp công thức bồi dưỡng hiện đại cùng phong cách quà tặng thanh lịch để tạo nên trải nghiệm sang trọng và tinh tế.',
    statsValue: '12 năm',
    statsLabel: 'Đồng hành cùng phân khúc quà tặng sức khỏe cao cấp',
    introKicker: 'Tinh thần thương hiệu',
    introTitle:
      'Tôn vinh giá trị bồi dưỡng, vẻ đẹp tinh tế và nghi thức sống chất lượng.',
    introDescription:
      'Mỗi sản phẩm được phát triển để phù hợp cả nhu cầu bồi dưỡng gia đình lẫn dành tặng đối tác quan trọng.',
    highlights: [
      'Nguyên liệu yến sạch từ nhà yến tuyển chọn',
      'Bao bì quà tặng sang trọng cho phân khúc cao cấp',
      'Dịch vụ tư vấn phác đồ bồi dưỡng theo nhu cầu',
    ],
    featuredKicker: 'Bộ sưu tập nổi bật',
    featuredTitle: 'Những lựa chọn được yêu thích trong bộ quà tặng yến sào sang trọng.',
    featuredDescription:
      'Danh mục được thiết kế cho nhiều dịp sử dụng: biếu tặng, chăm sóc sau bệnh, bồi dưỡng hằng ngày.',
    ctaKicker: 'Tư vấn riêng theo nhu cầu',
    ctaTitle: 'Cần tư vấn bộ quà tặng yến sào cho gia đình hay doanh nghiệp?',
    ctaButton: 'Nhận tư vấn đặt hàng',
  },
  productsPage: {
    kicker: 'Danh mục sản phẩm',
    title: 'Bộ sưu tập yến sào cao cấp cho quà tặng và chăm sóc sức khỏe.',
    description:
      'Tất cả sản phẩm được giới thiệu với ngôn ngữ thương hiệu cao cấp, tập trung vào chất lượng và trình bày sang trọng.',
  },
  contact: {
    kicker: 'Đặt hàng và liên hệ',
    title: 'Gửi đơn hàng trực tiếp để đội ngũ concierge xác nhận nhanh.',
    description:
      'Thông tin đơn hàng sẽ được gửi qua EmailJS mà không cần backend. Bạn chỉ cần cấu hình service, template và public key trước khi deploy.',
    showroomTitle: 'Showroom thương hiệu',
    hotlineTitle: 'Hotline tư vấn',
    hoursTitle: 'Khung giờ phục vụ',
  },
  products: createInitialProducts(),
}

export function createInitialSiteContent() {
  return JSON.parse(JSON.stringify(defaultSiteContent))
}
