console.log('#1. Змінні JavaScript')

/*
 * #1
 *
 * Створіть змінні зі значеннями.
 */

// ім'я змінної: myNum, значення: 10
// ім'я змінної: myStr, значення: 'some string'
// ім'я змінної: myBool, значення: true
// ім'я змінної: myArr, значення: 1, 2, 3, 4, 5
// ім'я змінної myObj, значення: first: 'First Name', last: 'Last Name'
const myNum = 10;
const myStr = "some string";
const myBool = true;
const myArr = [1,2,3,4,5];
const myObj = {first: "First Name", last: "Last Name"};

console.log('Змінна myNum =',myNum);
console.log('Змінна myStr =',myStr);
console.log('Змінна myBool =',myBool);
console.log('Змінна myArr =',myArr, "2-й елемент массива - ",myArr[1]);
console.log('Змінна myObj =',myObj,"Зміст myObj.first =",myObj.first);

/*
 * #2
 *
 * Відформатуйте ціле число, яке зберігається в змінній myNum, щоб отримати результат з 2 знаками після коми.
 * Результат збережіть у змінній decimal2.
 */
console.log('#2. Перетворення Number');
const decimal2  = myNum.toFixed(2);
console.log('Змінна myNum =',myNum,"змінна decimal2=",decimal2);
/*
 * #3
 *
 * Створіть змінну i, для якої виконайте префіксний та постфіксний інкремент та декремент.
 * Поекспериментуйте з результатами, виводячи їх у консоль.
 */

console.log('#3. інкремент та декремент і.');
let i = 5; 
console.log('Первинне значення i =',i);
console.log('Префіксний інкремент i =',++i,', після ',i);
console.log('Префіксний декремент i =',--i,', після ',i);
console.log('Постфіксний інкремент i =',i++,', після ',i);
console.log('Постфіксний декремент i =',i--,', після ',i);

/*
 * #4
 *
 * Створіть нову змінну myTest та присвойте їй значення 20.
 * Виконайте присвоєння з операцією, використовуючи оператори: +=, –=, *=, /=, %=.
 * Результати присвоюються в myTest, потім виводяться в консоль.
 * У розрахунках можна використовувати раніше оголошену змінну myNum та/або числа.
 */

console.log('#4. розрахунки та присвоювання myTest.');
let myTest  = 20;
console.log('Первинне значення myTest = ', myTest);
myTest += myNum; 
console.log('Присвоювання з розрахунком += ', myTest);
myTest -= myNum; 
console.log('Присвоювання з розрахунком –= ', myTest);
myTest *= 5; 
console.log('Присвоювання з розрахунком *= ',myTest);
myTest /= 4; 
console.log('Присвоювання з розрахунком /= ',myTest);
myTest %= 7; 
console.log('Присвоювання з розрахунком %= ',myTest);


/*
 * #5
 *
 * Використовуючи властивості та методи об'єкта Math, присвойте змінним та відобразіть у консолі.
 */

// константа Pi → myPi
// округлене значення числа 89.279 → myRound
// випадкове число між 0..10 → myRandom
// 3 у 5 степені → myPow
console.log('#5. Практика Math.');
let myPi  = Math.PI.toFixed(7);
console.log('Змінна Pi з 7-ма знаками, після коми = ',myPi);
let myRound = 89.279;
console.log('Округлене значення числа 89.279 = ', Math.round(myRound));
let myRandom    = 10;
console.log('Випадкове число між 0..10 = ', myRandom * Math.random());
let myPow    = 3;
console.log('3 у 5 степені = ', Math.pow(myPow, 5));

/*
 * #6
 *
 * Створіть об'єкт з ім'ям strObj.
 * Присвойте ключу str рядок тексту "Мама мыла раму, рама мыла маму", ключу length встановіть довжину цього рядка.
 * 
 */
// Мама мыла раму, рама мыла маму
// strObj

console.log('#6. Строковий об"єкт strObj.');
const strObj  = {str: "Мама мыла раму, рама мыла маму", length: "Мама мыла раму, рама мыла маму".length};
console.log('Текст strObj.str = ',strObj.str);
console.log('Добвжина тексту strObj.str = ', strObj.length);

/*
 * #7
 *
 * Перевірте наявність тексту 'рама' у полі str об'єкта strObj (див.п.6), результат збережіть у змінній isRamaPos та виведіть її у консоль.
 * Результатом для isRamaPos має бути індекс входження.
 * Результатом для isRama має бути буль true.
 */

// isRamaPos
// isRama
console.log('#7. Перевірте наявність тексту.');
let isRamaPos = strObj.str.indexOf('рама');
let isRama = strObj.str.includes('рама');
console.log('Індекс початка слова "рама" у strObj.str = ',isRamaPos);
console.log('Чи э слово "рама" у  strObj.str = ', isRama);

/*
 * #8
 *
 * Виконайте перейменування підрядка у рядку.
 * Як вихідний рядок використовуйте значення поля str об'єкта strObj (див.п.6), результат збережіть у змінній strReplace та відобразіть у консолі.
 * Вихідний рядок: 'Мама мыла раму, рама мыла маму'
 *      Результат: 'Мама моет раму, Рама держит маму'
 */

// strReplace
console.log('#8. Заміна сімволів у тексті.');
let strReplace = strObj.str.replace('Мама мыла','Мама моет');
strReplace  = strReplace.replace('рама мыла','Рама держит');
console.log('Значения strObj.str = ',strObj.str);
console.log('Значения strReplace = ', strReplace);

/*
 * #9
 *
 * Преобразуйте текст 'some STRING' у верхній, потім у нижній регістри, результат відобразіть у консолі.
 */

// var someStr = 'some STRING'
// var upperStr
// var lowerStr
console.log('#9. Перетворення регістрів текста.');
const someStr = 'some STRING';
const upperStr = someStr.toUpperCase();
const lowerStr = someStr.toLowerCase();
console.log('Первинне значення = ',someStr);
console.log('У верхньому регістрі = ', upperStr);
console.log('У нижньому регістрі = ', lowerStr);

