/* Exercise 10.7 - More jQuery animation (popover xem trước ảnh lớn) */
$(function () {

    $('figure img').on('mouseover', function (e) {

        // dựng tên file ảnh lớn từ ảnh nhỏ hiện tại
        var alt = $(this).attr('alt');
        var src = $(this).attr('src');
        var newsrc = src.replace("small", "medium");

        // tạo phần tử động chứa ảnh lớn và chú thích
        var preview = $('<div id="preview"></div>');
        var image = $('<img src="' + newsrc + '">');
        var caption = $('<p>' + alt + '</p>');
        preview.append(image);
        preview.append(caption);
        $('body').append(preview);

        // làm ảnh nhỏ chuyển sang xám
        $(this).addClass("gray");

        // hiện popover bằng fadeIn
        $("#preview").fadeIn(1000);
    });

    function removePreview() {
        // xóa popover và bỏ class gray
        $(this).removeClass("gray");
        $("#preview").remove();
    }

    function movePreview(e) {
        // đặt vị trí popover theo tọa độ chuột
        $("#preview")
            .css("top", (e.pageY - 10) + "px")
            .css("left", (e.pageX + 30) + "px");
    }

    $("figure img").on("mouseleave", removePreview);
    $("figure img").on("mousemove", movePreview);
});
