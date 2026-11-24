/* Hàm dùng chung cho cả 3 trang: index.html, product.html, status.html */

function formatVND(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"; }
function discountPercent(p) { return Math.round((1 - p.price / p.oldPrice) * 100); }
function getParam(name) { return new URLSearchParams(location.search).get(name); }
function findProduct(id) { return PRODUCTS.filter(function (p) { return p.id === +id; })[0]; }
function img(p, n) { return "images/p" + p.id + (n > 1 ? "-" + n : "") + ".svg"; }

/* ---- 1. Trạng thái kho bằng Bootstrap progress ---- */
function stockBar(p, big) {
  var pct = Math.min(100, Math.round(p.sold / p.stock * 100));
  var cls, label;
  if (pct >= 100)      { cls = "progress-bar-danger";  label = "Hết hàng"; }
  else if (pct >= 80)  { cls = "progress-bar-danger";  label = '<span class="glyphicon glyphicon-fire"></span> Sắp bán hết'; }
  else if (pct >= 50)  { cls = "progress-bar-warning"; label = "Đã bán " + p.sold; }
  else                 { cls = "progress-bar-info";    label = "Đã bán " + p.sold; }
  return '<div class="stock-bar' + (big ? ' big' : '') + '" title="Đã bán ' + p.sold + '/' + p.stock + '">' +
           '<div class="progress"><div class="progress-bar ' + cls + '" role="progressbar" style="width:' + Math.max(pct, 38) +
           '%" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"></div></div>' +
           '<span class="stock-text">' + label + '</span>' +
           '<span class="stock-left">Còn ' + Math.max(p.stock - p.sold, 0) + '</span></div>';
}

/* ---- 2. Huy hiệu: % giảm giá (trên-trái) + New / Best seller (trên-phải) ---- */
function badges(p) {
  var h = '<span class="badge-discount">-' + discountPercent(p) + '%</span>';
  if (p.tag === "new")  h += '<span class="badge-tag tag-new">New</span>';
  if (p.tag === "best") h += '<span class="badge-tag tag-best">Best seller</span>';
  return h;
}

/* ---- 3. Rating bằng thư viện bootstrap-star-rating (thay cho các icon sao viết tay) ---- */
function ratingInput(value, cls) {
  return '<input type="number" class="rating-loading ' + (cls || 'star-readonly') + '" value="' + value + '" />';
}
function initStars(scope) {
  $(scope || document).find(".star-readonly").rating({
    displayOnly: true, showCaption: false, showClear: false, size: "xs", step: 0.5, min: 0, max: 5, stars: 5
  });
}

/* ---- Thẻ sản phẩm ---- */
function productCard(p) {
  return '<div class="col-sm-6 col-md-4"><div class="thumbnail product-card">' + badges(p) +
    '<a href="product.html?id=' + p.id + '"><img src="' + img(p) + '" alt="' + p.name + '"></a>' +
    '<div class="add-to-cart"><a href="#" class="glyphicon glyphicon-plus-sign" data-toggle="tooltip" data-placement="top" title="Thêm vào giỏ" data-id="' + p.id + '"></a></div>' +
    '<div class="caption"><h4 class="name"><a href="product.html?id=' + p.id + '">' + p.name + '</a></h4>' +
    '<div><span class="price">' + formatVND(p.price) + '</span><span class="old-price">' + formatVND(p.oldPrice) + '</span></div></div>' +
    '<div class="ratings"><a class="review-link" href="product.html?id=' + p.id + '#comments">' + p.reviews + ' đánh giá</a>' + ratingInput(p.rating) + '</div>' +
    stockBar(p) + '</div></div>';
}
function renderProducts(selector, list) {
  var $c = $(selector).empty();
  if (!list.length) { $c.html('<div class="col-xs-12"><p class="text-muted">Không tìm thấy sản phẩm phù hợp.</p></div>'); return; }
  $c.html(list.map(productCard).join(""));
  initStars($c); $c.find('[data-toggle="tooltip"]').tooltip();
}

/* ---- Danh mục ---- */
function renderCategories(selector, onPick) {
  var html = '<li class="list-group-item active" data-cat="">Tất cả<span class="badge">' + PRODUCTS.length + '</span></li>';
  CATEGORIES.forEach(function (c) {
    var n = PRODUCTS.filter(function (p) { return p.cat === c; }).length;
    html += '<li class="list-group-item" data-cat="' + c + '" style="cursor:pointer">' + c + '<span class="badge">' + n + '</span></li>';
  });
  $(selector).html(html).on("click", "li", function () {
    $(this).addClass("active").siblings().removeClass("active");
    if (onPick) onPick($(this).data("cat"));
  });
}

/* ---- Giỏ hàng (đếm số lượng, lưu trong bộ nhớ trang) ---- */
var cartCount = 0;
function bindCart() {
  $(document).on("click", ".add-to-cart a, .btn-add-cart", function (e) {
    e.preventDefault(); cartCount++; $("#cart-count").text(cartCount);
  });
}

/* ---- Trang chủ ---- */
function initHome() {
  var state = { cat: "", q: "" };
  function refresh() {
    var list = PRODUCTS.filter(function (p) {
      return (!state.cat || p.cat === state.cat) && (!state.q || p.name.toLowerCase().indexOf(state.q) > -1);
    });
    renderProducts("#product-list", list);
  }
  renderCategories("#category-list", function (c) { state.cat = c; refresh(); });
  $(".search-form").on("submit", function (e) {
    e.preventDefault(); state.q = $.trim($(this).find("input").val()).toLowerCase(); refresh();
  });
  refresh(); bindCart();
}

/* ---- Trang chi tiết: xZoom + progress + badge + star-rating ---- */
function reviewHtml(r) {
  return '<div class="review-item"><div class="row"><div class="col-md-12">' + ratingInput(r.rating) +
    ' <strong>' + r.name + '</strong><span class="pull-right text-muted">' + r.ago + '</span>' +
    '<p class="text-muted">Từ <em>' + r.from + '</em></p><p>' + r.text + '</p></div></div></div>';
}
function initDetail() {
  var p = findProduct(getParam("id")) || PRODUCTS[0];
  document.title = p.name + " – Cà Phê Việt";
  renderCategories("#category-list", function (c) { location.href = "index.html"; });

  var thumbs = [1, 2, 3, 4].map(function (n) {
    return '<a href="' + img(p, n) + '"><img class="xzoom-gallery" width="72" src="' + img(p, n) + '" xpreview="' + img(p, n) + '" title="' + p.name + ' - ảnh ' + n + '"></a>';
  }).join("");

  $("#product-detail").html(
    '<div class="thumbnail detail-box"><div class="row">' +
      '<div class="col-sm-6"><div class="xzoom-container">' + badges(p) +
        '<img class="xzoom img-responsive" id="xzoom-default" src="' + img(p) + '" xoriginal="' + img(p) + '" alt="' + p.name + '">' +
        '<div class="xzoom-thumbs">' + thumbs + '</div></div></div>' +
      '<div class="col-sm-6">' +
        '<h4><a href="#">' + p.name + '</a></h4>' +
        '<div><span class="price-big">' + formatVND(p.price) + '</span><span class="old-price">' + formatVND(p.oldPrice) + '</span> ' +
          '<span class="label label-danger">-' + discountPercent(p) + '%</span></div>' +
        '<p style="margin-top:10px">' + p.desc + '</p>' + stockBar(p, true) +
        '<form role="form" onsubmit="return false">' +
          '<div class="number form-group"><label>Số lượng</label> <input type="number" class="input-sm" id="number" value="1" min="1" max="' + (p.stock - p.sold) + '"></div>' +
          '<div class="form-group"><label>Loại xay</label> <select id="grind"><option>Nguyên hạt</option><option>Xay phin</option><option>Xay espresso</option><option>Xay moka pot</option></select></div>' +
          '<div class="form-group"><label>Khối lượng</label> <div class="btn-group" id="weight">' +
            '<button type="button" class="btn btn-default">250g</button><button type="button" class="btn btn-default active">500g</button><button type="button" class="btn btn-default">1kg</button></div></div>' +
          '<div class="form-group"><button type="button" class="btn btn-default">Liên hệ người bán</button> <button type="button" class="btn btn-success btn-add-cart">Thêm vào giỏ</button></div>' +
        '</form>' +
      '</div></div>' +
      '<div class="description"><p>' + p.desc + ' Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.</p></div>' +
      '<div class="ratings"><p class="pull-right">' + (p.reviews) + ' đánh giá</p>' + ratingInput(p.rating) + ' <span>' + p.rating.toFixed(1) + ' sao</span></div>' +
      '<div class="well"><div class="text-right"><a class="btn btn-success" data-toggle="modal" data-target="#reviewModal">Viết đánh giá</a></div></div>' +
      '<div id="comments">' + REVIEWS.map(reviewHtml).join("") + '</div>' +
    '</div>' +
    '<h4>Có thể bạn cũng thích</h4><div class="row" id="other-products"></div>'
  );

  /* xZoom: chọn ảnh nhỏ -> đổi ảnh lớn + phóng to khi rê chuột */
  $(".xzoom, .xzoom-gallery").xzoom({ zoomWidth: 400, title: true, tint: "#333", Xoffset: 15 });

  $("#weight").on("click", ".btn", function () { $(this).addClass("active").siblings().removeClass("active"); });
  renderProducts("#other-products", PRODUCTS.filter(function (x) { return x.id !== p.id; }).slice(0, 3));
  initStars("#product-detail");
  bindCart();

  /* gửi đánh giá mới (star-rating tương tác) */
  $("#review-rating").rating({ showClear: false, showCaption: true, step: 1, size: "sm",
    starCaptions: { 1: "Rất tệ", 2: "Tệ", 3: "Bình thường", 4: "Tốt", 5: "Tuyệt vời" } });
  $("#review-form").on("submit", function (e) {
    e.preventDefault();
    var r = { name: $.trim($("#review-name").val()) || "Khách", rating: +$("#review-rating").val() || 5, from: "Việt Nam", ago: "Vừa xong", text: $("#review-text").val() };
    $("#comments").prepend(reviewHtml(r)); initStars("#comments"); $("#reviewModal").modal("hide"); this.reset();
  });
}

/* ---- Trang trạng thái đơn hàng ---- */
function initStatus() {
  var map = { track: '<button class="btn btn-sm btn-default">Theo dõi</button>',
              completed: '<button class="btn btn-sm btn-success">Hoàn thành</button>',
              cancelled: '<button class="btn btn-sm btn-danger">Đã hủy</button>' };
  var rows = ORDERS.map(function (o) {
    var p = findProduct(o.productId);
    return '<div class="thumbnail"><div class="row status-row">' +
      '<div class="col-sm-1 col-xs-3"><img class="img-responsive" src="' + img(p) + '" alt=""></div>' +
      '<div class="col-sm-4 col-xs-9"><a href="product.html?id=' + p.id + '">' + p.name + '</a></div>' +
      '<div class="col-sm-1 col-xs-3">' + o.qty + '</div>' +
      '<div class="col-sm-2 col-xs-4">' + formatVND(o.total) + '</div>' +
      '<div class="col-sm-2 col-xs-5">' + map[o.status] + '</div>' +
      '<div class="col-sm-2 col-xs-12"><a href="#">' + o.messages + ' tin nhắn</a></div></div></div>';
  }).join("");
  $("#orders").html(rows);
}
