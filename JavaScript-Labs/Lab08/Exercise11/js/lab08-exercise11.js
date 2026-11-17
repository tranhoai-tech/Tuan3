/* Exercise 8.11 - Arrays of objects */

// constructor function cho đối tượng Country
function Country(name, iso, capital, population) {
    this.name = name;
    this.iso = iso;
    this.capital = capital;
    this.population = population;
}

// tạo mảng các đối tượng country
var countries = [
    new Country("Bahamas", "BS", "Nassau", 301790),
    new Country("Canada", "CA", "Ottawa", 33679000),
    new Country("Germany", "DE", "Berlin", 81802257),
];

// có thể push thêm đối tượng vào cuối mảng
countries.push(new Country("Spain", "ES", "Madrid", 46505963));
countries.push(new Country("United Kingdom", "GB", "London", 62348447));

/* Bước 1-4 (đã thay bằng bước 5 bên dưới):
   - duyệt mảng, in countries[i].name
   - dùng biến tạm var c = countries[i];
   - bracket notation c["name"], và c[temp] với var temp = "name";
*/

// Bước 5: for..in để duyệt các thuộc tính của object
for (var i = 0; i < countries.length; i++) {
    var c = countries[i];
    document.write("<div class='box'>");
    document.write("<img src='../flags/" + c.iso + ".png' class='boxImg'>");
    for (var propertyName in c) {
        document.write("<strong>");
        document.write(propertyName + ": ");
        document.write("</strong>");
        document.write(c[propertyName]);
        document.write("<br>");
    }
    document.write("</div>");
}
