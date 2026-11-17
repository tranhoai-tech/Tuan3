/* ===== JavaScript-Labs – main.js =====
   >>> BƯỚC 1: sửa thông tin cá nhân ở đối tượng PROFILE bên dưới (chỉ cần sửa tại đây). <<<
*/
var PROFILE = {
    fullName: "TRẦN THỊ HOÀI",              // Họ và tên
    studentId: "31241027889",              // Mã số sinh viên
    className: "Phát triển ứng dụng TMĐT ",   // Lớp học phần
    githubUrl: "https://github.com/tranhoai-tech",                  // GitHub cá nhân
    repoUrl: "https://github.com/tranhoai-tech/Tuan3"           // Repository của học phần
};

/* ---------- điền thông tin cá nhân vào trang ---------- */
function fillProfile() {
    var fields = document.querySelectorAll("[data-profile]");
    for (var i = 0; i < fields.length; i++) {
        var key = fields[i].getAttribute("data-profile");
        if (PROFILE[key]) {
            fields[i].textContent = PROFILE[key];
        }
    }
    var links = document.querySelectorAll("[data-profile-href]");
    for (i = 0; i < links.length; i++) {
        var k = links[i].getAttribute("data-profile-href");
        if (PROFILE[k]) {
            links[i].setAttribute("href", PROFILE[k]);
        }
    }
    document.title = "JavaScript Labs – " + PROFILE.fullName + " (" + PROFILE.studentId + ")";
}

/* ---------- chế độ sáng/tối (lưu bằng localStorage) ---------- */
function initTheme() {
    var btn = document.getElementById("themeToggle");
    var saved = null;
    try { saved = localStorage.getItem("js-labs-theme"); } catch (e) {}
    if (saved) { document.documentElement.setAttribute("data-theme", saved); }
    btn.addEventListener("click", function () {
        var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", now);
        btn.textContent = now === "dark" ? "☀ Sáng" : "🌙 Tối";
        try { localStorage.setItem("js-labs-theme", now); } catch (e) {}
    });
    if (saved === "dark") { btn.textContent = "☀ Sáng"; }
}

/* ---------- tab kiến thức của 3 Lab ---------- */
function initTabs() {
    document.body.classList.add("js");
    var buttons = document.querySelectorAll(".tabs button");
    var panels = document.querySelectorAll(".panel-k");
    function show(id) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle("on", buttons[i].getAttribute("data-tab") === id);
        }
        for (i = 0; i < panels.length; i++) {
            panels[i].classList.toggle("on", panels[i].id === id);
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function (e) {
            show(e.currentTarget.getAttribute("data-tab"));
        });
    }
    show("k-lab08");
}

/* ---------- demo 1: giỏ hàng (DOM + sự kiện) ---------- */
var products = [
    { name: "Áo thun JavaScript", note: "Cotton 100%", price: 199000, qty: 1 },
    { name: "Cốc cà phê Debug", note: "Gốm sứ 350ml", price: 89000, qty: 2 },
    { name: "Sổ tay Code", note: "A5, 120 trang", price: 59000, qty: 1 }
];

function formatVND(n) {
    return n.toLocaleString("vi-VN") + " ₫";
}

function renderCart() {
    var list = document.getElementById("cartList");
    list.innerHTML = "";
    var total = 0;
    for (var i = 0; i < products.length; i++) {
        var p = products[i];
        total += p.price * p.qty;
        var row = document.createElement("div");
        row.className = "cart-row";
        row.innerHTML =
            '<div class="nm">' + p.name + '<small>' + p.note + ' · ' + formatVND(p.price) + '</small></div>' +
            '<div class="qty"><button data-act="minus" data-i="' + i + '" aria-label="Giảm">−</button>' +
            '<span>' + p.qty + '</span>' +
            '<button data-act="plus" data-i="' + i + '" aria-label="Tăng">+</button></div>' +
            '<div>' + formatVND(p.price * p.qty) + '</div>' +
            '<button class="rm" data-act="remove" data-i="' + i + '" title="Xóa">✕</button>';
        list.appendChild(row);
    }
    if (products.length === 0) {
        list.innerHTML = "<p>Giỏ hàng trống.</p>";
    }
    document.getElementById("cartTotal").textContent = formatVND(total);
}

function initCart() {
    document.getElementById("cartList").addEventListener("click", function (e) {
        var act = e.target.getAttribute("data-act");
        if (!act) { return; }
        var i = parseInt(e.target.getAttribute("data-i"), 10);
        if (act === "plus") { products[i].qty++; }
        if (act === "minus" && products[i].qty > 1) { products[i].qty--; }
        if (act === "remove") { products.splice(i, 1); }
        renderCart();
    });
    renderCart();
}

/* ---------- demo 2: kiểm tra biểu mẫu đăng ký (form validation) ---------- */
function setError(input, message) {
    var err = document.getElementById(input.id + "Err");
    err.textContent = message;
    input.classList.toggle("bad", message !== "");
    input.classList.toggle("ok", message === "" && input.value !== "");
}

function validateForm(e) {
    e.preventDefault();
    var name = document.getElementById("rName");
    var email = document.getElementById("rEmail");
    var pass = document.getElementById("rPass");
    var valid = true;

    if (name.value.trim().length < 2) { setError(name, "Vui lòng nhập họ tên (ít nhất 2 ký tự)."); valid = false; }
    else { setError(name, ""); }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) { setError(email, "Email không hợp lệ."); valid = false; }
    else { setError(email, ""); }

    if (pass.value.length < 8) { setError(pass, "Mật khẩu phải có ít nhất 8 ký tự."); valid = false; }
    else { setError(pass, ""); }

    var result = document.getElementById("regResult");
    result.className = valid ? "msg-ok" : "err";
    result.textContent = valid ? "Đăng ký thành công (demo – không gửi dữ liệu đi đâu cả)." : "Vui lòng sửa các lỗi ở trên.";
}

function initForm() {
    document.getElementById("regForm").addEventListener("submit", validateForm);
}

/* ---------- đếm từ phần tự đánh giá ---------- */
function countWords() {
    var el = document.getElementById("reflectText");
    var out = document.getElementById("wordCount");
    if (!el || !out) { return; }
    var words = el.innerText.trim().split(/\s+/).length;
    out.textContent = "(" + words + " từ)";
}

window.addEventListener("load", function () {
    fillProfile();
    initTheme();
    initTabs();
    initCart();
    initForm();
    countWords();
    document.getElementById("year").textContent = new Date().getFullYear();
});
