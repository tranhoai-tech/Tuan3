// this variable has global scope
var boxClass = 'movingDiv';

function outputBox(num) {
   var box = "<div class='" + boxClass + "' id='div" + num + "'>";
   box += "This is div " + num;
   box += "</div>";
   return box;
}

/* Exercise 9.5 - Responding to load events
   Bước 2-3: nếu chạy alert(divToGet.innerHTML) ngay khi tải script (nằm trong <head>)
   thì divToGet = null vì DOM chưa được tạo xong -> lỗi trong Console:
       var divToGet = document.getElementById("div1");
       alert(divToGet.innerHTML);
*/

// Bước 4: chờ sự kiện load rồi mới truy cập DOM
window.addEventListener("load", function () {
    var divToGet = document.getElementById("div1");
    alert(divToGet.innerHTML);
});
