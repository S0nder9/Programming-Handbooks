// Глава 2: Краткий курс по JavaScript - Операторы

// Операторы в JavaScript — это специальные символы или ключевые слова, которые выполняют операции над операндами.
// Они позволяют выполнять арифметические вычисления, сравнения, присваивания и другие действия.

// **1. Арифметические операторы**

console.log("Арифметические операторы");

// Оператор сложения (+)
let a = 5;
let b = 3;
let sum = a + b; // 8
console.log(`${a} + ${b} = ${sum}`);

// Оператор вычитания (-)
let difference = a - b; // 2
console.log(`${a} - ${b} = ${difference}`);

// Оператор умножения (*)
let product = a * b; // 15
console.log(`${a} * ${b} = ${product}`);

// Оператор деления (/)
let quotient = a / b; // 1.666...
console.log(`${a} / ${b} = ${quotient}`);

// Оператор деления с остатком (%)
let remainder = a % b; // 2
console.log(`${a} % ${b} = ${remainder}`);

// Оператор возведения в степень (**)
let power = a ** b; // 125
console.log(`${a} ** ${b} = ${power}`);

// **2. Операторы присваивания**

console.log("Операторы присваивания");

// Оператор присваивания (=)
let x = 10; // x теперь равно 10
console.log(`x = ${x}`);

// Оператор присваивания с добавлением (+=)
x += 5; // x теперь равно 15
console.log(`x += 5 => x = ${x}`);

// Оператор присваивания с вычитанием (-=)
x -= 3; // x теперь равно 12
console.log(`x -= 3 => x = ${x}`);

// Оператор присваивания с умножением (*=)
x *= 2; // x теперь равно 24
console.log(`x *= 2 => x = ${x}`);

// Оператор присваивания с делением (/=)
x /= 4; // x теперь равно 6
console.log(`x /= 4 => x = ${x}`);

// Оператор присваивания с остатком от деления (%=)
x %= 5; // x теперь равно 1
console.log(`x %= 5 => x = ${x}`);

// Оператор присваивания с возведением в степень (**=)
x **= 2; // x теперь равно 1
console.log(`x **= 2 => x = ${x}`);

// **3. Операторы сравнения**

console.log("Операторы сравнения");

// Оператор равенства (==)
console.log(`5 == '5' ? ${5 == '5'}`); // true, так как сравнение идет без проверки типа

// Оператор строгого равенства (===)
console.log(`5 === '5' ? ${5 === '5'}`); // false, так как сравнение идет с проверкой типа

// Оператор неравенства (!=)
console.log(`5 != 3 ? ${5 != 3}`); // true

// Оператор строгого неравенства (!==)
console.log(`5 !== '5' ? ${5 !== '5'}`); // true

// Оператор больше чем (>)
console.log(`5 > 3 ? ${5 > 3}`); // true

// Оператор меньше чем (<)
console.log(`5 < 3 ? ${5 < 3}`); // false

// Оператор больше или равно (>=)
console.log(`5 >= 5 ? ${5 >= 5}`); // true

// Оператор меньше или равно (<=)
console.log(`5 <= 3 ? ${5 <= 3}`); // false

// **4. Логические операторы**

console.log("Логические операторы");

// Логическое И (&&)
console.log(`true && false ? ${true && false}`); // false

// Логическое ИЛИ (||)
console.log(`true || false ? ${true || false}`); // true

// Логическое НЕ (!)
console.log(`!true ? ${!true}`); // false

// Логическое И с коротким замыканием (&&)
const resultAnd = (a > 2 && b < 5); // true, так как обе части условия истинны
console.log(`(a > 2 && b < 5) ? ${resultAnd}`);

// Логическое ИЛИ с коротким замыканием (||)
const resultOr = (a < 2 || b > 1); // true, так как хотя бы одно условие истинно
console.log(`(a < 2 || b > 1) ? ${resultOr}`);

// **5. Условный оператор (тернарный оператор)**

console.log("Условный оператор (тернарный оператор)");

// Оператор тернарного условия
const age = 18;
const canDrink = age >= 18 ? "Можете пить алкоголь" : "Не можете пить алкоголь";
console.log(`Возраст ${age}: ${canDrink}`);

// **6. Оператор нулевого слияния (??)**

console.log("Оператор нулевого слияния (??)");

// Оператор нулевого слияния возвращает правый операнд, если левый равен null или undefined
const value = null ?? 'default'; // 'default'
console.log(`null ?? 'default' ? ${value}`);

// **7. Оператор условного присваивания (&&=, ||=, ??=)**

console.log("Оператор условного присваивания (&&=, ||=, ??=)");

// Оператор логического И присваивания (&&=)
let xAnd = 1;
xAnd &&= 0; // xAnd теперь равно 0
console.log(`xAnd &&= 0 => xAnd = ${xAnd}`);

// Оператор логического ИЛИ присваивания (||=)
let xOr = 1;
xOr ||= 0; // xOr остается 1, так как 1 истинно
console.log(`xOr ||= 0 => xOr = ${xOr}`);

// Оператор нулевого слияния присваивания (??=)
let xNullish = null;
xNullish ??= 'default'; // xNullish теперь равно 'default'
console.log(`xNullish ??= 'default' => xNullish = ${xNullish}`);

// **8. Операторы битовых операций**

console.log("Операторы битовых операций");

// Оператор побитового И (&)
let bitwiseAnd = 5 & 3; // 1 (0101 & 0011 = 0001)
console.log(`5 & 3 = ${bitwiseAnd}`);

// Оператор побитового ИЛИ (|)
let bitwiseOr = 5 | 3; // 7 (0101 | 0011 = 0111)
console.log(`5 | 3 = ${bitwiseOr}`);

// Оператор побитового исключающего ИЛИ (^)
let bitwiseXor = 5 ^ 3; // 6 (0101 ^ 0011 = 0110)
console.log(`5 ^ 3 = ${bitwiseXor}`);

// Оператор побитового отрицания (~)
let bitwiseNot = ~5; // -6 (~0101 = 1010 (двуслойное представление: 1111...1110))
console.log(`~5 = ${bitwiseNot}`);

// Оператор побитового сдвига влево (<<)
let shiftLeft = 5 << 1; // 10 (0101 << 1 = 1010)
console.log(`5 << 1 = ${shiftLeft}`);

// Оператор побитового сдвига вправо (>>)
let shiftRight = 5 >> 1; // 2 (0101 >> 1 = 0010)
console.log(`5 >> 1 = ${shiftRight}`);

// Оператор побитового сдвига вправо с заполнением нулями (>>>)
let shiftRightUnsigned = -5 >>> 1; // 2147483642
console.log(`-5 >>> 1 = ${shiftRightUnsigned}`);

// **9. Оператор typeof и instanceof**

console.log("Операторы typeof и instanceof");

// Оператор typeof возвращает строку, указывающую тип операнда
console.log(`typeof 5 => ${typeof 5}`); // 'number'
console.log(`typeof 'Hello' => ${typeof 'Hello'}`); // 'string'

// Оператор instanceof проверяет, является ли объект экземпляром конструктора
class Person {}
const person = new Person();
console.log(`person instanceof Person => ${person instanceof Person}`); // true

// **10. Оператор delete**

console.log("Оператор delete");

// Оператор delete удаляет свойство объекта или элемент массива
const obj = { name: 'Alice', age: 25 };
delete obj.age; // удаляем свойство age
console.log(`После delete obj.age:`, obj);

// Удаление элемента массива
const arr = [1, 2, 3];
delete arr[1]; // удаляем элемент с индексом 1
console.log(`После delete arr[1]:`, arr); // [1, empty, 3]

// Итог:
// Операторы в JavaScript позволяют выполнять широкий спектр операций, от простых арифметических вычислений до сложных логических проверок.
// Знание различных операторов и их применения важно для эффективного программирования и написания чистого и эффективного кода.
