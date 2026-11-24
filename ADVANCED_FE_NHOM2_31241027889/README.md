# Bài tập Chương 6 – Advanced FrontEnd (Nhóm 2: áp dụng vào tình huống thực tế)

Môn: Phát triển ứng dụng TMĐT – TS Nguyễn Mạnh Tuấn (UEH)

## Cấu trúc
| Thư mục | Nội dung |
|---|---|
| `ecommerce/` | Website cà phê "Cà Phê Việt" (Bootstrap 3.3.7): `index.html` (danh sách), `product.html` (chi tiết, xZoom), `status.html` (đơn hàng) |
| `jquery-lms/` | `lms.js` (dán vào Console trang LMS-UEH) và `lms-demo.html` (trang mô phỏng để chạy thử) |
| `flappy-bird/` | Game Flappy Chim Lửa: `index.html`, `game.js`, `style.css`, `images/` |

## Cách chạy
- Chỉ cần mở file `.html` bằng trình duyệt (Chrome/Edge). **Cần Internet** vì dùng CDN cho Bootstrap, jQuery,
  bootstrap-star-rating và xZoom (riêng Flappy Bird chạy offline được).
- Nếu CDN xZoom/star-rating bị chặn: tải thư viện về, đặt vào thư mục `ecommerce/lib/` rồi sửa đường dẫn trong phần `<head>` / cuối `<body>`.
- Muốn đổi ngành hàng: sửa `ecommerce/js/products.js` (tên, giá, mô tả, ảnh `images/p1.svg`…).

## Điều khiển Flappy Bird
`↓` (Arrow Down) vỗ cánh / bắt đầu / chơi lại · `P` tạm dừng · `M` tắt/bật âm thanh.
Level: 5 điểm → Level 2 (Interval 30) · 20 điểm → Level 3 (25) · 40 điểm → Level 4 (20) · 50 điểm → thắng.
