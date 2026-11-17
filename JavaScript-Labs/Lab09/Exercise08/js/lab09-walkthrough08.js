/* Exercise 9.8 - Form validation */

/* responsible for setting up event listeners on page */
function init() {
    // ẩn khung báo lỗi ngay từ đầu (khung này có sẵn class "visible" trong HTML)
    document.getElementById("errors").className = "hidden";
    document.getElementById("sampleForm").addEventListener("submit", checkForEmptyFields);
}

/* initialize handlers once page is ready */
window.addEventListener("load", init);

/* ensures form fields are not empty */
function checkForEmptyFields(e) {
    // bước 3: ẩn thông báo lỗi cũ
    var errorArea = document.getElementById("errors");
    errorArea.className = "hidden";

    var cssSelector = "input[type=text],input[type=password]";
    var fields = document.querySelectorAll(cssSelector);

    // duyệt các ô nhập để tìm ô còn trống
    var fieldList = [];
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].value == null || fields[i].value == "") {
            // có ô trống -> chặn việc gửi form
            e.preventDefault();
            fieldList.push(fields[i]);
        }
    }

    // tạo thông báo lỗi (bước 1 dùng alert(msg); bước 3 hiển thị trong <div id="errors">)
    var msg = "The following fields can't be empty: ";
    if (fieldList.length > 0) {
        for (i = 0; i < fieldList.length; i++) {
            msg += fieldList[i].id + ",";
        }
        errorArea.innerHTML = "<p>" + msg + "</p>";
        errorArea.className = "visible";
    }
}
