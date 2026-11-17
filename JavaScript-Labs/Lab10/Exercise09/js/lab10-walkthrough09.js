/* Exercise 10.9 - GET requests */

// Lưu ý triển khai: GitHub Pages chạy HTTPS nên phải gọi service bằng https:// (http:// bị trình duyệt chặn - mixed content).
var url = "https://www.randyconnolly.com/funwebdev/services/travel/cities.php";
var fallbackUrl = "data/cities-fallback.json";   // dữ liệu dự phòng nếu service không truy cập được

$(function () {
    $("#consume").click(function () {
        $("#results").html("<ul></ul>");
        $("#source-note").text("");

        // Bước 3-5: $.get + kiểm tra status + $.each
        $.get(url, function (data, status) {
            if (status == "success") {
                $.each(data, function (index, value) {
                    var li = $('<li/>').html(value.name);
                    li.appendTo("div#results ul");
                });
            }
        }, "json")
        // nếu service lỗi (offline, CORS, đổi địa chỉ...) thì dùng dữ liệu dự phòng để bài vẫn chạy được
        .fail(function () {
            $("#source-note").text("(Service bên ngoài không phản hồi - đang hiển thị dữ liệu dự phòng trong data/cities-fallback.json)");
            $.getJSON(fallbackUrl, function (data) {
                $.each(data, function (index, value) {
                    $('<li/>').html(value.name).appendTo("div#results ul");
                });
            });
        });
    });
});
