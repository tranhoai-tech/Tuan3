/* Exercise 10.1 - Set up jQuery
   HTML tải jQuery từ CDN (code.jquery.com, dùng https để chạy được trên GitHub Pages),
   nếu CDN không truy cập được thì nạp bản dự phòng ../js/jquery-3.1.1.min.js (bước 3). */

// Kiểm tra jQuery đã sẵn sàng chưa và nạp từ đâu
$(function () {
    console.log("jQuery version: " + $.fn.jquery);
    $("#msgArea").val("jQuery " + $.fn.jquery + " da duoc nap thanh cong!");
    var viaFallback = !!$('script[src$="../js/jquery-3.1.1.min.js"]').length;
    console.log(viaFallback ? "Nap tu ban du phong (local)" : "Nap tu CDN");
});
