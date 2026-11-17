/* Exercise 8.12 - Hands-on: thay các khối HTML lặp lại bằng lời gọi hàm JavaScript.
   Dữ liệu (continents, countries, posts) nằm trong travel-data.js. */

// Danh sách châu lục -> <ul class="list-group">
function outputContinents() {
    var html = '<ul class="list-group">';
    for (var i = 0; i < continents.length; i++) {
        html += '<li class="list-group-item"><a href="#">' + continents[i] + '</a></li>';
    }
    html += '</ul>';
    document.write(html);
}

// Danh sách quốc gia phổ biến; quốc gia đang chọn (selected) hiển thị dạng "active", không có liên kết
function outputCountries(selected) {
    var html = '<ul class="list-group">';
    for (var i = 0; i < countries.length; i++) {
        if (countries[i] === selected) {
            html += '<li class="list-group-item active">' + countries[i] + '</li>';
        } else {
            html += '<li class="list-group-item"><a href="#">' + countries[i] + '</a></li>';
        }
    }
    html += '</ul>';
    document.write(html);
}

// Tạo HTML cho MỘT bài viết (post) từ một object trong mảng posts
function postRow(post) {
    var html = '<div class="row">';
    html += '<div class="col-md-2">';
    html += '<a href="post.php?id=' + post.id + '"><img src="../images/travel/' + post.thumb +
            '" alt="' + post.title + '" class="img-thumbnail"/></a>';
    html += '</div>';
    html += '<div class="col-md-10">';
    html += '<h2>' + post.title + '</h2>';
    html += '<div class="details">Posted by ' + post.user +
            '<span class="pull-right">' + post.postdate + '</span></div>';
    html += '<p class="excerpt">' + post.excerpt + '</p>';
    html += '<p><a href="post.php?id=' + post.id + '" class="btn btn-primary btn-sm">Read more</a></p>';
    html += '</div>';
    html += '</div>';
    return html;
}

// Xuất toàn bộ danh sách bài viết, các bài cách nhau bằng <hr/>
function outputPosts() {
    var html = '';
    for (var i = 0; i < posts.length; i++) {
        html += postRow(posts[i]);
        if (i < posts.length - 1) {
            html += '<hr/>';
        }
    }
    document.write(html);
}

// Phân trang: nút « và », các số trang 1..total, trang hiện tại có class "active"
function outputPagination(current, total) {
    var html = '<ul class="pagination">';
    html += '<li><a href="#">&laquo;</a></li>';
    for (var p = 1; p <= total; p++) {
        if (p === current) {
            html += '<li class="active"><a href="#">' + p + '</a></li>';
        } else {
            html += '<li><a href="#">' + p + '</a></li>';
        }
    }
    html += '<li><a href="#">&raquo;</a></li>';
    html += '</ul>';
    document.write(html);
}
