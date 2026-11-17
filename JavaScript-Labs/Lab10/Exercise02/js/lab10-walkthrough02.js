/* Exercise 10.2 - Basic selectors */

// Bước 2: chọn theo id và gán giá trị
var msg = $('#msgArea');
msg.val("here is some new text");

// Bước 3: html() đọc/ghi nội dung HTML.
// Lưu ý: đề bài dùng $('#first').html(...) sẽ ghi đè CẢ khối #first (kể cả <textarea>),
// khiến bước 4 không còn phần tử để thao tác. Ở đây áp dụng cho tiêu đề #pageTitle để các bước sau vẫn chạy.
$('#pageTitle').html("new Title");

// Bước 4: attr() đọc/ghi thuộc tính
$('#msgArea').val("My class is " + $('#msgArea').attr("class"));

// Bước 5: chọn theo thẻ - css() áp dụng cho TẤT CẢ phần tử (không cần vòng lặp)
var buttons = $('button');
buttons.css('background-color', 'red');

// Bước 6: chọn <body>
var temp = $('body');
temp.css("background-color", "ivory");

// Bước 7: chọn theo class + method chaining
$('.center-icons').addClass('selected');
