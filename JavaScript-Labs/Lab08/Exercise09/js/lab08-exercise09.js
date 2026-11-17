/* Exercise 8.9 - Functions as objects */

var isCanadian = true;

/* Bước 1: các hàm ban đầu
function taxRate() { if (isCanadian) { return 0.05; } else { return 0.0; } }
function calculateTax(amount) { return amount * taxRate(); }

   Bước 3: lồng hàm taxRate() vào trong calculateTax()
   Bước 4: gán hàm có tên cho biến:  var tax = function taxRate() {...};
   Bước 5: dùng hàm ẩn danh (anonymous):  var tax = function () {...};
*/

// Bước 6 (phiên bản cuối): truyền hàm ẩn danh như một tham số
function calculateTax(amount, tax) {
    return amount * tax();
}

function calculateTotal(price, quantity) {
    var amount = price * quantity;
    return amount + calculateTax(amount, function () {
        if (isCanadian) {
            return 0.05;
        } else {
            return 0.0;
        }
    });
}
