// this variable has global scope
var boxClass = 'movingDiv';

function outputBox(num) {
   var box = "<div class='" + boxClass + "' id='div" + num + "'>";
   box += "This is div " + num;
   box += "</div>";
   return box;
}

/* Exercise 9.6 - Debugging events
   Bước 2-6: mở DevTools > Sources, mở file này, đặt breakpoint ở dòng alert(...) bên dưới,
   rồi di chuột lên các <div> và quan sát biến e / e.target trong panel Scope/Watch. */

// Bước 7: gắn sự kiện mouseover cho mọi .movingDiv
window.addEventListener("load", function () {
    var divs = document.querySelectorAll(".movingDiv");
    for (var i = 0; i < divs.length; i++) {
        divs[i].addEventListener("mouseover", function (e) {
            alert("triggered by " + e.target.id);
        });
    }
});
