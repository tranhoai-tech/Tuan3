# JavaScript-Labs – Phát triển ứng dụng TMĐT (Chương 4: JavaScript)

## 1. Thông tin sinh viên

| | |
|---|---|
| Họ và tên | **NGUYỄN VĂN A** *(sửa lại)* |
| Mã số sinh viên | 31211000001 *(sửa lại)* |
| Lớp học phần | ... *(sửa lại)* |
| GitHub | https://github.com/USERNAME *(sửa lại)* |
| GitHub Pages | https://USERNAME.github.io/REPOSITORY/JavaScript-Labs/ *(sửa lại)* |

## 2. Mục tiêu

Thực hiện đầy đủ 03 bài Lab trong học phần để:

- **Lab 08 – JavaScript 1: Language Foundations**: nắm cú pháp JavaScript, biến, hàm, mảng, object, các đối tượng dựng sẵn (String, Date, Math) và công cụ Console.
- **Lab 09 – JavaScript 2: DOM and Events**: truy xuất/thay đổi DOM, tạo – xóa phần tử, xử lý sự kiện, làm việc với form và kiểm tra dữ liệu, gỡ lỗi bằng DevTools.
- **Lab 10 – JavaScript 3: jQuery**: dùng jQuery Selectors, Events, thao tác DOM, hiệu ứng (Animation) và GET Requests với jqXHR.

## 3. Cấu trúc thư mục

```text
JavaScript-Labs/
├── index.html            # Trang chủ (portfolio) – thông tin cá nhân, giới thiệu, liên kết 3 Lab, tổng kết
├── css/style.css         # Giao diện trang chủ và các trang giới thiệu Lab
├── js/main.js            # JavaScript của trang chủ (PROFILE, tab, giỏ hàng demo, kiểm tra form)
├── assets/avatar.svg     # Ảnh đại diện mặc định (thay bằng assets/avatar.jpg của bạn)
├── Lab08/
│   ├── index.html        # Danh sách Exercise 8.1 – 8.12
│   ├── css/  images/  flags/    # Tài nguyên dùng chung của Lab 08
│   └── Exercise01 … Exercise12/ # Mỗi Exercise: index.html + file .js tương ứng
├── Lab09/
│   ├── index.html        # Danh sách Exercise 9.1 – 9.8
│   ├── css/  images/
│   └── Exercise01 … Exercise08/
├── Lab10/
│   ├── index.html        # Danh sách Exercise 10.1 – 10.10
│   ├── css/  images/  js/jquery-3.1.1.min.js (bản dự phòng)
│   └── Exercise01 … Exercise10/
└── README.md
```

## 4. Nội dung từng Lab

### Lab 08 – Language Foundations (Exercise 8.1 – 8.12)
| Exercise | Nội dung |
|---|---|
| 8.1 | Bật/tắt JavaScript trong trình duyệt, trang kiểm tra cục bộ |
| 8.2 | JavaScript nhúng trong `<head>` (alert) |
| 8.3 | JavaScript ngoài – `hello.js` |
| 8.4 | Thẻ `<noscript>` |
| 8.5 | Console: `console.log/warn/error`, lỗi cố ý (`index-error.html`) |
| 8.6 | Đối tượng dựng sẵn: String, Date, Math; so sánh `==` và `===` |
| 8.7 | Mảng: `push`, `unshift`, vòng lặp, bảng lịch 30 ngày |
| 8.8 | Hàm: tham số, giá trị trả về, phạm vi biến |
| 8.9 | Hàm như một object: hàm lồng nhau, ẩn danh, truyền làm tham số |
| 8.10 | Tạo object: `new Object()`, `{}`, literal, constructor |
| 8.11 | Mảng các object (Country) và `for..in` |
| 8.12* | Bài tập tổng hợp (Travel Posts) – thay HTML lặp bằng hàm JavaScript |

### Lab 09 – DOM and Events (Exercise 9.1 – 9.8)
| Exercise | Nội dung |
|---|---|
| 9.1 | Chọn phần tử DOM (`getElementById`, `querySelector(All)`, …) |
| 9.2 | Quan hệ cha – con – anh em trong DOM, `nodeType` |
| 9.3 | `createElement`, `appendChild`, `removeChild` |
| 9.4 | Sự kiện click / mouseover / mouseout, `setTimeout` |
| 9.5 | Sự kiện `load` |
| 9.6 | Gỡ lỗi sự kiện bằng DevTools (breakpoint) |
| 9.7 | Form: sự kiện focus / blur |
| 9.8 | Kiểm tra dữ liệu form, `preventDefault()` |

### Lab 10 – jQuery (Exercise 10.1 – 10.10)
| Exercise | Nội dung |
|---|---|
| 10.1 | Nạp jQuery từ CDN + bản dự phòng cục bộ |
| 10.2 | Selectors cơ bản |
| 10.3 | Selectors nâng cao |
| 10.4 | Sự kiện jQuery (`on`, `off`, document ready) |
| 10.5 | Chèn phần tử DOM |
| 10.6 | Hiệu ứng fade / slide |
| 10.7 | Popover xem ảnh lớn |
| 10.8 | `animate()` nhiều bước |
| 10.9 | GET request (`$.get`, `$.each`) |
| 10.10 | jqXHR: `done / fail / always` |

## 5. Đường dẫn GitHub Pages

- Trang chủ: `https://USERNAME.github.io/REPOSITORY/JavaScript-Labs/`
- Lab 08: `https://USERNAME.github.io/REPOSITORY/JavaScript-Labs/Lab08/`
- Lab 09: `https://USERNAME.github.io/REPOSITORY/JavaScript-Labs/Lab09/`
- Lab 10: `https://USERNAME.github.io/REPOSITORY/JavaScript-Labs/Lab10/`

*(Thay `USERNAME` và `REPOSITORY` bằng thông tin thật.)*

## 6. Hướng dẫn truy cập

1. Mở trang chủ ở đường dẫn GitHub Pages phía trên.
2. Chọn **Lab 08 / Lab 09 / Lab 10** để vào danh sách Exercise của từng Lab.
3. Bấm vào từng Exercise để chạy kết quả; mở **F12 → Console** để xem các thông báo `console.log/warn/error`.
4. Chạy cục bộ: mở trực tiếp `index.html`, hoặc dùng *Live Server* trong VS Code.

## 7. Ghi chú kỹ thuật

- Tất cả thư viện/CDN dùng `https://` để không bị chặn (mixed content) khi chạy trên GitHub Pages.
- Lab 10 dùng jQuery 3.1.1 từ CDN, có bản dự phòng `Lab10/js/jquery-3.1.1.min.js`.
- Exercise 10.9 và 10.10 gọi web service bên ngoài; nếu service không phản hồi thì trang tự dùng dữ liệu dự phòng `data/cities-fallback.json`.
- Đã sửa nhỏ `Lab09/css/lab09.css` (thiếu dấu `;` sau `filter`) để hiệu ứng chuyển xám hoạt động ổn định trên mọi trình duyệt.
