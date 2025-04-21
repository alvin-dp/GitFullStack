/*
 ! Завдання: Реалізація Функції з Каруванням для Побудови Повного Доменного Імені

 Створіть функцію `curriedDomain`, яка використовує принцип карування для побудови повного доменного імені. Функція повинна дозволяти послідовне встановлення компонентів доменного імені: протоколу, назви домену та домену верхнього рівня (TLD).

 Функція `curriedDomain` має працювати наступним чином:
 1. При першому виклику `curriedDomain` приймає протокол (`protocol`, наприклад, 'http' або 'https') і повертає функцію, яка приймає назву домену.
 2. При другому виклику ця повернена функція приймає назву домену (`domainName`, наприклад, 'example' або 'mywebsite') і повертає ще одну функцію, яка приймає домен верхнього рівня.
 3. При третьому виклику остання функція приймає домен верхнього рівня (`tld`, наприклад, 'com', 'org') і повертає повне доменне ім'я у форматі `protocol://domainName.tld`.

 Очікуваний вивід:
 - При виклику `curriedDomain('https')('example')('com')` повинно повертатися 'https://example.com'.

 Ця задача допоможе поглибити розуміння концепції карування та замикань у JavaScript, а також показує практичне застосування цих концепцій у реальних сценаріях програмування.
*/
console.log('Task 2');
function curriedDomain(protocol) {
  protocol  = protocol + "://";
  return function (domain)
  {
    domain  = protocol + domain + ".";
    return function (lastDomain) 
    {
      return  domain + lastDomain;
    }
  }
}

// Приклад використання
const protocolSetter = curriedDomain('https')
const domainNameSetter = protocolSetter('example')
const fullDomain = domainNameSetter('com') // Повинно повернути 'https://example.com'
const domainNameGoogle = protocolSetter('google')
const fullGoogle = domainNameGoogle('com') // Повинно повернути 'https://google.com'
console.log('Full Domain:', fullDomain)
console.log('Full Google:', fullGoogle)

/*
 Ось як працює цей код:

 При першому виклику curriedDomain приймає протокол (protocol, наприклад, ‘http’ або ‘https’) і повертає функцію, яка приймає назву домену.
 При другому виклику ця повернена функція приймає назву домену (domainName, наприклад, ‘example’ або ‘mywebsite’) і повертає ще одну функцію, яка приймає домен верхнього рівня.
 При третьому виклику остання функція приймає домен верхнього рівня (tld, наприклад, ‘com’, ‘org’) і повертає повне доменне ім’я у форматі protocol://domainName.tld.
*/

//export { curriedDomain }
