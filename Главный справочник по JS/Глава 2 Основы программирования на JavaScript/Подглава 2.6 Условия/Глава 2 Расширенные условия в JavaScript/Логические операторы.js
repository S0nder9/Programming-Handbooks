// Глава 2: Расширенные условия в JavaScript
// Подглава 2.2: Логические операторы

// Логическое И (&&)
// Возвращает true, если оба операнда истинны.
console.log(true && true);   // true
console.log(true && false);  // false
console.log(false && true);  // false
console.log(false && false); // false

// Логическое ИЛИ (||)
// Возвращает true, если хотя бы один из операндов истинен.
console.log(true || true);   // true
console.log(true || false);  // true
console.log(false || true);  // true
console.log(false || false); // false

// Логическое НЕ (!)
// Инвертирует значение операнда (делает true -> false и false -> true).
console.log(!true);  // false
console.log(!false); // true

// Комбинация логических операторов
// Логические операторы могут быть комбинированы для создания сложных условий.
// Например, (A && B) || (C && D)
// В этом примере, если A и B истинны, или если C и D истинны, результат будет true.
