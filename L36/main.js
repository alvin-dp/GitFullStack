"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
exports.sumArray = sumArray;
exports.createUser = createUser;
exports.getOrderStatus = getOrderStatus;
console.log('#19. TypeScript homework example file');
/*
 * #1
 *
 * Задача: Розробити функцію `sumArray`, яка приймає масив чисел і повертає їх суму.
 *
 * Мета: Створення надійної функції, що здатна обробляти масиви чисел різної довжини, включаючи порожні масиви, і повертати точну суму їх елементів.
 *
 * Вимоги до реалізації:
 * 1 Функція повинна приймати один аргумент: `numbers` - масив чисел (`number[]`).
 * 2. Функція повинна повертати суму елементів масиву як число (`number`).
 * 3. Якщо масив порожній, функція повинна повертати `0`.
 * 4. Функція має використовувати метод `reduce` для обчислення суми елементів масиву.
 *
 */
console.log('Task #1');
function sumArray(intArray) {
    let sum = 0;
    if (!(intArray.length === 0)) {
        sum = intArray.reduce((accum, digit) => accum + digit, 0);
    }
    return sum;
}
// Вивід до консолі для демонстрації
console.log(sumArray([1, 2, 3, 4])); // Повинно вивести 10
console.log(sumArray([])); // Повинно вивести 0
/*
 * #2
 *
 * Задача: Розробити функцію createUser, яка створює об'єкт користувача з заданими властивостями.
 *
 * Мета: Створити функцію, що дозволяє легко генерувати нові об'єкти користувачів з переданими атрибутами ім'я, вік та статус активності, використовуючи визначений тип User.
 *
 * Вимоги до реалізації:
 * 1. Функція повинна приймати три параметри: name (рядок), age (число) та isActive (булеве значення).
 * 2. Функція має повертати об'єкт, що відповідає типу User. Тип User має бути оголошений з використанням ключового слова `type` та включати властивості name, age, та isActive.
 * 3. Об'єкт, що повертається, має мати типи властивостей відповідно до оголошеного типу User: name як string, age як number, isActive як boolean.
 * 4. Визначення типу User має бути сумісним зі структурою об'єкта, який повертається функцією, включно з порядком та наявністю всіх властивостей.
 * 5. Функція має правильно обробляти випадок, коли isActive не передано, і за замовчуванням вважати цей параметр true.
 *
 */
console.log('Task #2');
function createUser(uName, uAge, uActive = true) {
    let user = {
        name: uName,
        age: uAge,
        isActive: uActive
    };
    return user;
}
const newUser = createUser('Анна', 25, true);
const newUser2 = createUser('Danny', 15);
console.log(newUser);
console.log(newUser2);
/*
 * #3
 *
 * Задача: Розробити функцію getOrderStatus, яка приймає статус замовлення як параметр і повертає рядок з описом статусу.
 *
 * Мета: Створення функції, здатної ідентифікувати статус замовлення і надавати користувачеві зрозуміле пояснення щодо поточного стану замовлення.
 *
 * Вимоги до реалізації:
 * 1. У коді має бути присутній enum OrderStatus з необхідними статусами.
 * 2. enum OrderStatus повинен мати статуси: 'Pending', 'Shipped', 'Delivered', 'Cancelled'.
 * 3. Функція має використовувати enum OrderStatus для визначення можливих статусів замовлення.
 * 4. Функція має приймати один параметр типу OrderStatus і повертати рядок з описом статусу.
 * 5. Функція повинна правильно обробити кожен статус замовлення, повертаючи відповідне повідомлення:
 * -  'Pending' -> 'Замовлення очікує на обробку',
 * -  'Shipped' -> 'Замовлення було відправлено',
 * -  'Delivered' -> 'Замовлення доставлено',
 * -  'Cancelled' -> 'Замовлення скасовано'
 * -  прокинути помилку з текстом 'Невідомий статус замовлення' в будь-якому іншому випадку.
 * 6. Параметри функції та її тип повернення мають бути явно типізовані.
 *
 */
console.log('Task #3');
var OrderStatus;
(function (OrderStatus) {
    // Pending   ='Замовлення очікує на обробку',
    // Shipped   ='Замовлення було відправлено',
    // Delivered ='Замовлення доставлено',
    // Cancelled ='Замовлення скасовано'    
    OrderStatus[OrderStatus["Pending"] = 0] = "Pending";
    OrderStatus[OrderStatus["Shipped"] = 1] = "Shipped";
    OrderStatus[OrderStatus["Delivered"] = 2] = "Delivered";
    OrderStatus[OrderStatus["Cancelled"] = 3] = "Cancelled";
    OrderStatus[OrderStatus["Created"] = 4] = "Created";
    OrderStatus[OrderStatus["Returned"] = 5] = "Returned";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
function getOrderStatus(curentStatus) {
    let strStatus;
    switch (curentStatus) {
        case 0:
            strStatus = 'Замовлення очікує на обробку';
            break;
        case 1:
            strStatus = "Замовлення було відправлено";
            break;
        case 2:
            strStatus = "Замовлення доставлено";
            break;
        case 3:
            strStatus = "Замовлення скасовано";
            break;
        default:
            strStatus = 'Невідомий статус замовлення';
    }
    return strStatus;
}
// Приклад виклику функції
console.log(getOrderStatus(OrderStatus.Pending));
console.log(getOrderStatus(OrderStatus.Shipped));
console.log(getOrderStatus(OrderStatus.Delivered));
console.log(getOrderStatus(OrderStatus.Cancelled));
console.log(getOrderStatus(OrderStatus.Returned));
