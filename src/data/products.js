export const defaultProducts = [
  {
    id: 'khanh-vang-6-lo',
    slug: 'khanh-vang-6-lo',
    name: 'Khánh Vàng 6 Lọ Yến Chưng Sẵn',
    category: 'Quà tặng cao cấp',
    price: '2.680.000đ',
    size: '6 lọ x 70 ml',
    rating: '4.9/5',
    badge: 'Bán chạy',
    summary:
      'Dòng quà tặng sang trọng phối yến chưng sẵn nguyên chất và táo đỏ hữu cơ, thích hợp biếu tặng đối tác và gia đình.',
    hero:
      'Vị yến mềm, ngọt thanh, hậu vị nhẹ, tôn vinh nghi thức chăm sóc sức khỏe mỗi ngày.',
    benefits: [
      'Yến chưng sẵn nguyên chất 18% hàm lượng tối ưu',
      'Dòng lọ thủy tinh phủ vàng tạo cảm giác sang trọng',
      'Phù hợp biếu tặng dịp lễ, Tết và sự kiện doanh nghiệp',
    ],
    ingredients: 'Tổ yến tinh chế, táo đỏ hữu cơ, đường phèn vàng, nước tinh khiết.',
    usage:
      'Dùng ngon hơn khi ướp lạnh. Mỗi ngày 1 lọ vào buổi sáng hoặc trước khi ngủ 1 giờ.',
  },
  {
    id: 'yen-tinh-che-thuong-hang',
    slug: 'yen-tinh-che-thuong-hang',
    name: 'Yến Tinh Chế Thượng Hạng 100g',
    category: 'Tổ yến nguyên liệu',
    price: '4.950.000đ',
    size: 'Hộp sơn mài 100g',
    rating: '5.0/5',
    badge: 'Tinh tuyển',
    summary:
      'Tổ yến được chọn lọc từ nhà yến ven biển, sợi dày, ít gãy vụn, phù hợp cho người ưu tiên chất lượng.',
    hero:
      'Khởi đầu từ nguồn yến sạch, quá trình tinh chế tỉ mỉ giữ lại kết cấu sợi dày và mùi thơm đặc trưng.',
    benefits: [
      'Độ ẩm được kiểm soát để bảo quản lâu hơn',
      'Sợi yến dài, dễ chưng thành nhiều món bồi dưỡng',
      'Bao bì hộp sơn mài phủ kim cao cấp',
    ],
    ingredients: '100% tổ yến tinh chế không tẩy trắng.',
    usage:
      'Ngâm 25 - 30 phút, chưng cách thủy 20 phút với đường phèn hoặc hạt sen, táo đỏ.',
  },
  {
    id: 'yen-thuong-hong-saffron',
    slug: 'yen-thuong-hong-saffron',
    name: 'Yến Thượng Hồng Saffron',
    category: 'Nước yến vị sáng tạo',
    price: '1.980.000đ',
    size: '8 lọ x 70 ml',
    rating: '4.8/5',
    badge: 'Phiên bản giới hạn',
    summary:
      'Kết hợp yến chưng sẵn, nhụy hoa nghệ tây saffron và rose nectar cho trải nghiệm thưởng thức tinh tế.',
    hero:
      'Bảng màu hổ phách sáng nhẹ, hương hoa dịu, thích hợp cho khách hàng trẻ yêu thích sản phẩm chăm sóc sức khỏe.',
    benefits: [
      'Công thức thưởng dưỡng phù hợp làm đẹp và nghỉ dưỡng',
      'Thiết kế chai thon dài, tôn chất sang trọng tinh tuyển',
      'Là lựa chọn nổi bật trong bộ sưu tập quà tặng',
    ],
    ingredients: 'Tổ yến chưng sẵn, saffron, mật hoa hồng, đường phèn, nước tinh khiết.',
    usage:
      'Dùng ngon hơn khi lạnh sau bữa ăn nhẹ hoặc trước buổi họp quan trọng.',
  },
]

export function createInitialProducts() {
  return JSON.parse(JSON.stringify(defaultProducts))
}

export function getProductBySlug(slug) {
  return defaultProducts.find((product) => product.slug === slug)
}