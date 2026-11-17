/* Exercise 8.7 - Arrays */

// Bước 2: tạo mảng
var daysOfWeek = new Array("Mon", "Tues", "Wed", "Thur", "Fri");
// document.write(daysOfWeek + "<br>");

// Bước 3: push() thêm vào cuối mảng
daysOfWeek.push("Sat");
// document.write(daysOfWeek + "<br/>");

// Bước 4: unshift() thêm vào đầu mảng
daysOfWeek.unshift("Sun");
// document.write(daysOfWeek + "<br/>");

// Bước 6-7: duyệt mảng để tạo dòng tiêu đề; từ dài hơn 3 ký tự in nghiêng bằng <em>
var day;
document.write("<table border=1>");
document.write("<tr>");
for (var i = 0; i < daysOfWeek.length; i++) {
    if (daysOfWeek[i].length < 4)
        day = daysOfWeek[i];
    else
        day = "<em>" + daysOfWeek[i] + "</em>";
    document.write("<th>" + day + "</th>");
}
document.write("</tr>");

// Bước 8: xuất các ngày 1..30, giả sử tháng bắt đầu từ Chủ nhật
var totalDays = 30;
var cell = 0;                      // vị trí cột hiện tại (0 = Sun)
document.write("<tr>");
for (var d = 1; d <= totalDays; d++) {
    document.write("<td>" + d + "</td>");
    cell++;
    if (cell % 7 === 0 && d < totalDays) {   // hết một tuần -> xuống dòng
        document.write("</tr><tr>");
    }
}
// điền ô trống cho tuần cuối để bảng đều cột
while (cell % 7 !== 0) {
    document.write("<td></td>");
    cell++;
}
document.write("</tr>");
document.write("</table>");
