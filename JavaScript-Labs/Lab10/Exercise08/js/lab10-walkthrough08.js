/* Exercise 10.8 - Complex animations
   Bước 2: animate({left: '495px'})
   Bước 3: animate nhiều thuộc tính cùng lúc (left, opacity, height)
   Bước 4 (cuối): xâu chuỗi nhiều animate() -> chạy lần lượt (queue) */
$(function () {
    $("button").click(function () {
        $("#box")
            .animate({
                left: '495px',
                opacity: '1',
                height: '50px'
            })
            .animate({ top: '400px', opacity: '0.2' })
            .animate({ height: '200px' }, 2000);
    });
});
