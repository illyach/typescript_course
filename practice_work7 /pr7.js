var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//Крок 2: Створення функцій для пошуку товарів
// Знаходить товар за його ID.
// products - Масив товарів, серед яких потрібно шукати.
// id - Ідентифікатор товару для пошуку.
// Повертає перший товар із відповідним ID або undefined, якщо товар не знайдено.
var findProduct = function (products, id) {
    return products.find(function (product) { return product.id === id; });
};
// Фільтрує товари за максимальною ціною.
// products - Масив товарів для фільтрації.
// maxPrice - Максимальна допустима ціна.
// Повертає новий масив товарів, ціна яких менша або дорівнює maxPrice.
var filterByPrice = function (products, maxPrice) {
    return products.filter(function (product) { return product.price <= maxPrice; });
};
var addToCart = function (cart, product, quantity) {
    return __spreadArray(__spreadArray([], cart, true), [{ product: product, quantity: quantity }], false);
};
// Розраховує загальну вартість кошика.
// cart - Масив елементів кошика.
// Функція використовує метод reduce для проходу по кожному елементу масиву cart.
// total - Накопичувач, який зберігає суму вартості товарів. Початкове значення - 0.
// item - Поточний елемент масиву cart, що містить товар (product) і кількість (quantity).
// Для кожного елемента обчислюється добуток ціни товару (item.product.price) на кількість (item.quantity),
// і додається до total. В кінці функція повертає загальну суму.
var calculateTotal = function (cart) {
    return cart.reduce(function (total, item) { return total + item.product.price * item.quantity; }, 0);
};
//Крок 4: Використання функцій
var electronics = [
    { id: 1, name: "Телефон", price: 2000, category: "electronics", warranty: "2 роки" }
];
var clothing = [
    { id: 2, name: "Сорочка", price: 1400, category: "clothing", size: "M", material: "Cotton" }
];
var phone = findProduct(electronics, 1);
console.log("Знайдений телефон:", phone);
var cheapClothing = filterByPrice(clothing, 1400);
console.log("Дешевий одяг:", cheapClothing);
var cart = [];
var updatedCart = addToCart(cart, clothing[0], 2);
console.log("Оновлений кошик:", updatedCart);
var total = calculateTotal(updatedCart);
console.log("Загальна вартість кошика:", total);
