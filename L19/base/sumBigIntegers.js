/*
 Створіть функцію sumBigIntegers, яка приймає два рядки (numStr1 та numStr2), що представляють великі числа.
 Функція повинна перетворити ці рядки на BigInt і повернути їх суму.

 console.log(sumBigIntegers('9007199254740991', '9007199254740991')); // виводить 18014398509481982n
*/

function sumBigInts(numStr1, numStr2) {
  bigInt1 = BigInt(numStr1);
  bigInt2 = BigInt(numStr2);
 
  return bigInt1 + bigInt2
}
console.log("function #3 sumBigInts");
console.log(sumBigInts('900719925474066791', '9007199254740991')); 
console.log(sumBigInts('9007254199254740991', '900719925474066791')); 
console.log(sumBigInts('9007199254740991', '9007199254740991')); // виводить 18014398509481982n