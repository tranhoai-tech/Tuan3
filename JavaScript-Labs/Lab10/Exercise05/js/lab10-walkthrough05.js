/* Exercise 10.5 - Inserting DOM elements
   Thử lần lượt từng cách bằng cách bỏ comment đúng MỘT dòng ở cuối hàm:
     panel.after(img)        -> chèn SAU panel (bước 2)
     panel.before(img)       -> chèn TRƯỚC panel (bước 3)
     panel.append(img)       -> thêm vào CUỐI bên trong panel (bước 4)
     panel.prepend(img)      -> thêm vào ĐẦU bên trong panel (bước 5)
     img.appendTo(panel)     -> tương đương append (bước 6)
     img.prependTo(panel)    -> tương đương prepend (bước 7)
     img.insertBefore(panel) -> tương đương before (bước 8)
*/
$(function () {
    // create a new DOM element
    var img = $('<img src="../images/art/thumbs/13030.jpg" >');
    // and now add the new element near the panel
    var panel = $('.panel');

    // panel.after(img);
    // panel.before(img);
    // panel.append(img);
    // panel.prepend(img);
    // img.appendTo(panel);
    // img.prependTo(panel);
    img.insertBefore(panel);   // bước 8 (phiên bản cuối)
});
