/* Exercise 10.10 - jqXHR handling: done / fail / always */
var goodUrl = "https://www.randyconnolly.com/funwebdev/services/travel/cities.php";
var badUrl  = "https://www.randyconnolly.com/funwebdev/services/travel/khong-ton-tai.php";   // cố ý sai để kích hoạt .fail()
var fallbackUrl = "data/cities-fallback.json";

function showCities(data) {
    $.each(data, function (index, value) {
        var li = $('<li/>').html(value.name);
        li.appendTo("div#results ul");
    });
}

function consume(url) {
    $('.animLoading').show();
    $("div#results ul").empty();
    $("#source-note").text("");

    $.get(url)
        // done xảy ra đầu tiên khi request thành công
        .done(function (data) {
            showCities(data);
        })
        // fail chạy khi có lỗi, trước always()
        .fail(function (xhr, status, error) {
            alert("failed loading data - status=" + status + " error=" + error);
            // hiển thị dữ liệu dự phòng để trang vẫn có nội dung
            $("#source-note").text("(Hiển thị dữ liệu dự phòng trong data/cities-fallback.json)");
            $.getJSON(fallbackUrl, showCities);
        })
        // always luôn nằm cuối: tắt ảnh loading dù thành công hay thất bại
        .always(function (data) {
            $('.animLoading').fadeOut("slow");
        });
}

$(function () {
    $('.animLoading').hide();
    $("#consume").click(function () { consume(goodUrl); });
    $("#consumeBad").click(function () { consume(badUrl); });
});
