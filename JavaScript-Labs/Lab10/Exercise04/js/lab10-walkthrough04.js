/* Exercise 10.4 - jQuery listeners */

/* Bước 2: shortcut method
   $(".panel").click(function() { $("#message").html("You clicked in the panel"); });
   Bước 3: dùng on("click", ...)
   Bước 4: bọc trong $(function () {...}) = sự kiện document ready */

// Bước 5 (phiên bản cuối): gắn nhiều sự kiện bằng chaining; click sẽ off("mousemove")
$(function () {
    $(".panel")
        .on("mousemove", function (e) {
            $("#message").html("x=" + e.pageX + " y=" + e.pageY);
        })
        .on("mouseleave", function (e) {
            $("#message").html("goodbye!");
        })
        .on("click", function () {
            $("#message").html("stopped move reporting");
            $(".panel").off("mousemove");
        });
});
