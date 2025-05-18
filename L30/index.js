const originalText = "Привіт, світ. Світ такий великий.";
const newText = originalText.replace(/світ/gi, "Всесвіт");
console.log(newText);

const text = "Ааааа, вулиця 12345!";

// Знайти послідовності 'а' (одна або більше)
const lettersA = text.match(/а+/gi);

// Знайти послідовності цифр (одна або більше)
const digits = text.match(/\d+/g);

// Знайти необов'язкову літеру 'у'
const optionalLetter = text.match(/ву?лиця/gi);

console.log(`Послідовності 'а': ${lettersA}, Цифри: ${digits}, Необов'язкова 'у': ${optionalLetter}`);