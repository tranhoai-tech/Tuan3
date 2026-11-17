/* Exercise 8.8 - JavaScript functions */

// Bước 8: biến toàn cục (global scope)
var boxClass = 'movingDiv';

// Bước 1 -> 6: hàm đi từ document.write trực tiếp -> trả về chuỗi -> có tham số num
function outputBox(num) {
    // Bước 10: nếu bỏ "var" ở dòng dưới thì box trở thành biến toàn cục (dễ gây lỗi) -> luôn khai báo var
    var box = "<div class='" + boxClass + "' id='div" + num + "'>";
    box += "This is div " + num;
    box += "</div>";
    return box;
}
