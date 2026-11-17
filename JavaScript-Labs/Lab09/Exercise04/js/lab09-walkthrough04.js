/* Exercise 9.4 - Simple event handling */

var btn = document.getElementById("testButton");

// Bước 2 (ban đầu): simpleHandler chỉ alert("button was clicked")
// Bước 5: ẩn/hiện đoạn văn bằng display
// Bước 6 (phiên bản cuối): thêm CSS transition + setTimeout
function simpleHandler(event) {
    var content = document.getElementById("content");
    if (btn.innerHTML == "Hide") {
        btn.innerHTML = "Show";
        content.className = "makeItDisappear";
        // đổi display sau 1000 ms (chờ hiệu ứng mờ dần kết thúc)
        setTimeout(function () {
            content.style.display = "none";
        }, 1000);
    }
    else {
        btn.innerHTML = "Hide";
        content.style.display = "block";

        // đổi class sau 500 ms
        setTimeout(function () {
            content.className = "makeItNormal";
        }, 500);
    }
}

btn.addEventListener("click", simpleHandler);

// Bước 3: mouseover -> ảnh chuyển sang trắng đen
var img = document.getElementById("mainImage");
img.addEventListener("mouseover", function (event) {
    img.className = "makeItGray";
});

// Bước 4: mouseout -> bỏ hiệu ứng
img.addEventListener("mouseout", function (event) {
    img.className = "makeItNormal";
});
