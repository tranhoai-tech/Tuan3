/* Exercise 10.3 - Advanced selectors */

// Bước 2-3 (đã comment theo yêu cầu): chọn mọi ô mật khẩu
// $(':password').css('background-color', 'yellow');

// Bước 4: chọn phần tử con thứ 4n (4, 8, 12...) trong form
$('form :nth-child(4n)').css('background-color', 'yellow');

// Bước 5: chọn <label> có chứa chữ "word"
$('label:contains("word")').css("color", "black");
