/* Dữ liệu mẫu: cửa hàng cà phê rang xay "Cà Phê Việt" */
var CATEGORIES = ["Cà phê hạt", "Cà phê xay", "Cà phê đặc biệt"];

var PRODUCTS = [
  { id:1, name:"Arabica Cầu Đất 500g", cat:"Cà phê hạt", price:189000, oldPrice:210000, tag:"best", stock:100, sold:87, rating:4.5, reviews:56,
    desc:"Arabica trồng ở độ cao 1.500m tại Cầu Đất – Đà Lạt, rang medium, hương hoa quả, vị chua thanh, hậu ngọt." },
  { id:2, name:"Robusta Buôn Ma Thuột 500g", cat:"Cà phê hạt", price:129000, oldPrice:159000, tag:"new", stock:120, sold:30, rating:4, reviews:18,
    desc:"Robusta nguyên chất Tây Nguyên, rang đậm, vị đắng mạnh, hậu socola, rất hợp pha phin và cà phê sữa đá." },
  { id:3, name:"Culi Đặc Biệt 500g", cat:"Cà phê hạt", price:169000, oldPrice:199000, tag:null, stock:80, sold:4, rating:3.5, reviews:6,
    desc:"Hạt culi tròn chọn lọc, vị đậm đà, ít chua, hương thơm nồng; được nhiều quán cà phê truyền thống tin dùng." },
  { id:4, name:"Moka Cầu Đất 250g", cat:"Cà phê xay", price:149000, oldPrice:175000, tag:null, stock:60, sold:41, rating:4, reviews:22,
    desc:"Moka rang xay sẵn, hương thơm quyến rũ, chua nhẹ, phù hợp pha phin, French press hoặc moka pot." },
  { id:5, name:"Cà phê Chồn Đặc Biệt 250g", cat:"Cà phê đặc biệt", price:450000, oldPrice:500000, tag:"best", stock:40, sold:36, rating:5, reviews:31,
    desc:"Cà phê chồn thượng hạng, hương thơm quyến rũ, vị êm dịu, hậu ngọt lâu; đóng gói hút chân không." },
  { id:6, name:"Blend Sài Gòn 1kg", cat:"Cà phê xay", price:235000, oldPrice:290000, tag:"new", stock:150, sold:22, rating:4.5, reviews:12,
    desc:"Phối trộn Robusta – Arabica – Culi theo tỉ lệ 6:3:1, đậm đà cân bằng, thích hợp cho quán và gia đình." }
];

var REVIEWS = [
  { name:"Nguyễn Minh Anh", rating:4, from:"TP. Hồ Chí Minh", ago:"1 ngày trước", text:"Cà phê thơm, đóng gói đẹp, giao nhanh. Sẽ mua lại!" },
  { name:"Trần Quốc Huy", rating:5, from:"Hà Nội", ago:"2 ngày trước", text:"Pha phin rất ngon, vị đậm và hậu ngọt đúng như mô tả." },
  { name:"Lê Thị Hoa", rating:4, from:"Đà Nẵng", ago:"5 ngày trước", text:"Chất lượng tốt so với mức giá, mình giới thiệu cho bạn bè." }
];

var ORDERS = [
  { productId:1, qty:1, total:189000, status:"track", messages:1 },
  { productId:2, qty:2, total:258000, status:"completed", messages:1 },
  { productId:3, qty:1, total:169000, status:"cancelled", messages:0 },
  { productId:4, qty:1, total:149000, status:"track", messages:1 },
  { productId:5, qty:1, total:450000, status:"completed", messages:1 },
  { productId:6, qty:1, total:235000, status:"track", messages:1 }
];
