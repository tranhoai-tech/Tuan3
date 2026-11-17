/* Exercise 9.2 - DOM family relations
   Bước 1-5: mở Console (F12) và gõ lần lượt:
     document.getElementById("first")
     document.getElementById("first").firstChild                 // nút văn bản (khoảng trắng), không phải <h1>
     document.getElementById("first").firstChild.nextSibling     // phần tử cùng cấp kế tiếp
     document.getElementById("first").parentNode
*/

// Bước 6: duyệt các nút con của #stories và ghi ra Console kèm nodeType
var stories = document.getElementById("stories");
for (var i = 0; i < stories.childNodes.length; i++) {
    console.log("child " + i + " =" + stories.childNodes[i] +
                " nodeType=" + stories.childNodes[i].nodeType);
}

// Bước 7: đổi màu nền các nút KHÔNG phải text (nodeType === 1 là Element)
function colorElementChildren(parentId, color) {
    var parent = document.getElementById(parentId);
    for (var j = 0; j < parent.childNodes.length; j++) {
        if (parent.childNodes[j].nodeType === 1) {
            parent.childNodes[j].style.backgroundColor = color;
        }
    }
}
colorElementChildren("stories", "#d9edf7");  // các cột trong #stories
colorElementChildren("first", "#dff0d8");    // các phần tử con trong #first (đề bài nhắc đến "first")
