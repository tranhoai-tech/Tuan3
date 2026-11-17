/* Exercise 8.10 - Creating JavaScript objects
   Mỗi cách tạo object dùng một tên biến riêng để cả 5 cách cùng chạy và hiển thị trên một trang. */

// ---- Cách 1 (bước 1-3): new Object() + gán thuộc tính
document.write("<h3>Cách 1: new Object()</h3>");
var order1 = new Object();
order1.product = "Self Portrait in a Straw Hat";
order1.price = 15.0;
order1.quantity = 2;
order1.total = function () { return this.price * this.quantity; };

document.write("Product=" + order1.product);
document.write("<br>Price=" + order1.price);
document.write("<br>Quantity=" + order1.quantity);
document.write("<br>Total=" + order1.total());
// Bước 3: bỏ cặp ngoặc () -> trả về nội dung hàm chứ không thực thi hàm
document.write("<br>Total (thiếu dấu ngoặc)=" + order1.total);

// ---- Cách 2 (bước 4-5): object rỗng {} + ký hiệu ngoặc vuông
document.write("<h3>Cách 2: {} và bracket notation</h3>");
var order2 = {};
order2["product"] = "Self Portrait in a Straw Hat";
order2["price"] = 15.0;
order2["quantity"] = 2;
order2["total"] = function () { return this.price * this.quantity; };
document.write("Product=" + order2.product + " | Total=" + order2.total());

// ---- Cách 3 (bước 6): object literal
document.write("<h3>Cách 3: object literal</h3>");
var order3 = {
    product: "Self Portrait in a Straw Hat",
    price: 15.0,
    quantity: 2,
    total: function () { return this.price * this.quantity; }
};
document.write("Product=" + order3.product + " | Total=" + order3.total());

// ---- Cách 4 (bước 7-11): constructor function, tạo nhiều đối tượng
function order(product, price, quantity) {
    this.product = product;
    this.price = price;
    this.quantity = quantity;
    this.total = function () { return this.price * this.quantity; },

    this.output = function () {
        document.write("<p>Product=" + this.product);
        document.write("<br>Price=" + this.price);
        document.write("<br>Quantity=" + this.quantity);
        document.write("<br>Total=" + this.total());
    }
}

document.write("<h3>Cách 4: constructor function</h3>");
var example1 = new order("Self Portrait in a Straw Hat", 15, 2);
var example2 = new order("Untitled #23", 10, 4);

example1.output();
example2.output();
