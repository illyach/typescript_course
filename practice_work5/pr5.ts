type BaseProduct = {
    id: number;
    name: string;
    price: number;
    // Додайте інші базові поля
};
    

type Electronics = BaseProduct & {
    category: "electronics";
    warranty: string;
  };
  
  // Специфічний тип для одягу
  type Clothing = BaseProduct & {
    category: "clothing";
    size: string; 
    material: string; 
  };

//Крок 2: Створення функцій для пошуку товарів


// Знаходить товар за його ID.
// products - Масив товарів, серед яких потрібно шукати.
// id - Ідентифікатор товару для пошуку.
// Повертає перший товар із відповідним ID або undefined, якщо товар не знайдено.
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
  };
  



// Фільтрує товари за максимальною ціною.
// products - Масив товарів для фільтрації.
// maxPrice - Максимальна допустима ціна.
// Повертає новий масив товарів, ціна яких менша або дорівнює maxPrice.
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
  };

//Крок 3 Створення кошика
type CartItem<T> = {
    product: T;
    quantity: number;
};


const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
  ): CartItem<T>[] => {
    return [...cart, { product, quantity }];
  };


  

// Розраховує загальну вартість кошика.
// cart - Масив елементів кошика.
// Функція використовує метод reduce для проходу по кожному елементу масиву cart.
// total - Накопичувач, який зберігає суму вартості товарів. Початкове значення - 0.
// item - Поточний елемент масиву cart, що містить товар (product) і кількість (quantity).
// Для кожного елемента обчислюється добуток ціни товару (item.product.price) на кількість (item.quantity),
// і додається до total. В кінці функція повертає загальну суму.
  const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  

//Крок 4: Використання функцій
  const electronics: Electronics[] = [
    { id: 1, name: "Телефон", price: 2000, category: "electronics", warranty: "2 роки" }
  ];
  
  const clothing: Clothing[] = [
    { id: 2, name: "Сорочка", price: 1400, category: "clothing", size: "M", material: "Cotton" }
  ];
  
 
  const phone = findProduct(electronics, 1);
  console.log("Знайдений телефон:", phone);
  
  const cheapClothing = filterByPrice(clothing, 1400);
  console.log("Дешевий одяг:", cheapClothing);
  
  const cart: CartItem<BaseProduct>[] = [];
  const updatedCart = addToCart(cart, clothing[0], 2);
  console.log("Оновлений кошик:", updatedCart);
  
  const total = calculateTotal(updatedCart);
  console.log("Загальна вартість кошика:", total);