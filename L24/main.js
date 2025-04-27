/*
 * #1
 *
 * Розробити функцію, яка використовує метод reduce масиву для обчислення суми усіх елементів масиву чисел.
 Функція повинна приймати масив чисел та повертати їх суму.
*/
console.log("Sum Task");
function sumArray(numbers) {
   return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

// Використання функції
const exampleArray = [1, 2, 3, 4, 5 ]
const sum = sumArray(exampleArray)
console.log('Сума елементів масиву:', sum); // Виведення суми


/*
 * #2
 *
 * Розробити функцію, яка використовує метод map масиву для створення нового масиву, в якому кожен елемент буде вдвічі більшим за елементи вхідного масиву чисел.
*/
console.log("DoubleArray Task");
function doubleArrayElements(numbers) {
    function dubler(n)
    {  
        return n*2
    }
  return numbers.map(dubler);
}

// Використання функції
const exampleArray2 = [1, 2, 3, 4, 5]
const doubledArray = doubleArrayElements(exampleArray2)
console.log('Подвоєні елементи масиву:', doubledArray) // Виведення подвоєних елементів


/*
 * #3
 *
 * Розробити клас `SkillsManager`, що відповідає за управління списком навичок. Клас повинен включати:
 * 1. Конструктор:
 * - Ініціалізує порожній масив `skills`, який буде використовуватися для зберігання навичок.
 * 2. Метод `addSkill(skill)`:
 * - Приймає один аргумент `skill` (рядок).
 * - Перевіряє, чи аргумент є рядком і має мінімум два символи.
 * - Якщо умови виконані, додає `skill` до масиву `skills` і повертає додану навичку.
 * - Якщо умови не виконані (навичка не є рядком або має менше двох символів), повертає `null`.
 * 3. Метод `getAllSkills()`:
 *   - Повертає поточний масив усіх навичок, збережених у класі.
 *
 * Загальні вимоги:
 * - Клас має бути модульним і здатним до використання в інших частинах програми, тому він повинен бути експортований.
 * - Клас має забезпечувати легке управління навичками, включаючи додавання нових навичок та отримання списку всіх наявних навичок.
 * - Код має бути написаний з урахуванням принципів чистого коду, забезпечуючи читабельність та легкість підтримки.
*/
console.log("SkillsManager Task");
class SkillsManager {
  constructor() {
    this.skills  = new Array();
  }
  addSkill(skill) {
    if (typeof skill !== "string" || skill.length <2 )
    {
      return null;
    }

    this.skills.push(skill);
    return skill;
  }

  getAllSkills() {
    return this.skills;
  }

}

const skillsManager = new SkillsManager()

console.log(skillsManager.addSkill('JavaScript'))
console.log(skillsManager.addSkill('CSS'))
console.log(skillsManager.addSkill('C'))
console.log(skillsManager.addSkill(23))
console.log(skillsManager.addSkill(undefined))
console.log(skillsManager.addSkill('React'))
console.log(skillsManager.getAllSkills())


/*
 * #4
 * Задача: Калькулятор дат.
 * Завдання: Створити модуль на JavaScript, який імплементує функцію-конструктор DateCalculator для створення об'єктів, здатних керувати датами. Калькулятор дат має надавати такі можливості:
 * Додавання днів: Метод addDays приймає кількість днів як аргумент і додає цю кількість до поточної дати об'єкта.
 * Віднімання днів: Метод subtractDays приймає кількість днів як аргумент і віднімає цю кількість від поточної дати об'єкта.
 * Отримання результату: Метод getResult повертає поточну дату об'єкта у форматі "YYYY-MM-DD".
 *
 * Критерії перевірки:
 * В модулі має бути визначена функція-конструктор DateCalculator, яка ініціалізує об'єкт з початковою датою.
 * Мають бути реалізовані та доступні методи addDays, subtractDays, та getResult для екземплярів DateCalculator.
 * Об'єкти DateCalculator мають створюватися за допомогою ключового слова new і використання функції-конструктора.
 */
console.log("DateCalculator Task");
function DateCalculator(initialDate) {
  this.oneDayInMillsec = 24 * 60 * 60 * 1000;
  if (typeof initialDate === 'string') {    
    const newDate = new Date(initialDate);  
    try
    {      
      if (newDate == "Invalid Date")  {
        throw new Error ("Wrong date string!!!");
      }      
    }
    catch (error)
      {
        console.log(error.message);
        return ;       
      }
      this.selectedDate  = newDate;
  }
  else{    
    this.selectedDate  = new Date(); 
  }

  this.checkDays =function(numder){
     if (typeof numder !== "number")
       {
         throw new Error ("Only numbers is allowed.");
       }
   }    
  this.addDays = function(days) {
     try {
      this.checkDays(days);
     }
     catch (error){
       console.log(error.message);
       return ;
     }
     this.selectedDate.setTime(this.selectedDate.getTime() + days * this.oneDayInMillsec);
  }

  this.subtractDays = function(days) {
    try {
      this.checkDays(days);
     }
     catch (error){
      console.log(error.message);
      return ;
     }
     this.selectedDate.setTime(this.selectedDate.getTime() - days * this.oneDayInMillsec);
  }

  this.getResult = function() {
     //YYYY-MM-DD
     const year   = this.selectedDate.getFullYear();
     const month  = this.selectedDate.getMonth() + 1;
     const day    = this.selectedDate.getDate();
     return "" + year + "-" + ((month<10) ? "0" + month : month ) + "-" + ((day<10) ? "0" + day : day);
    }
  ;
}

// Демонстрація використання
console.log('Initial date - 2023-03-01');
 const dateCalculator = new DateCalculator('2023-03-01')
 dateCalculator.addDays(5)
 console.log("Plus 5 days - " + dateCalculator.getResult()) // Виводить нову дату після додавання днів
//
 dateCalculator.subtractDays(3)
 console.log("Minus 3 days - " + dateCalculator.getResult()) // Виводить нову дату після віднімання днів
 dateCalculator.addDays("dsa")           // Спроба передати не число, виводить помилку
 console.log("Same date - " + dateCalculator.getResult()) // Виводить туж саму дату 
 const dateCalculator2 = new DateCalculator('фівафівпфіпфівп') //Помилка створення
//export { doubleArrayElements, sumArray, SkillsManager, DateCalculator }
