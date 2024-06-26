// Глава 2: Краткий курс по JavaScript - Массивы

// Подглава 1.1: Определение массивов
// Что такое массивы в JavaScript?
// Массивы — это объекты, предназначенные для хранения упорядоченных коллекций данных.
// Элементы массива индексируются, начиная с 0, и могут хранить любые типы данных.

function defineArray() {
  const exampleArray = [1, 'two', { three: 3 }, [4]];
  console.log(exampleArray); // [1, 'two', { three: 3 }, [4]]
}

// Зачем нужны массивы в программировании?
// Массивы используются для организации данных, чтобы упростить их обработку и управление.


// Подглава 1.2: Создание массивов
// Литеральная нотация массивов
function createArrayLiteral() {
  const arrayLiteral = [1, 2, 3, 4, 5];
  console.log(arrayLiteral); // [1, 2, 3, 4, 5]
}

// Использование конструктора Array()
function createArrayConstructor() {
  const arrayConstructor = new Array(5);
  console.log(arrayConstructor); // [empty × 5]
}

// Массивоподобные объекты
function arrayLikeObject() {
  const arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
  };
  console.log(Array.from(arrayLike)); // ['a', 'b', 'c']
}


// Глава 2: Работа с элементами массива
// Подглава 2.1: Доступ к элементам массива
// Индексация элементов массива
function accessArrayElements() {
  const array = [10, 20, 30, 40, 50];
  console.log(array[0]); // 10
  console.log(array[4]); // 50
}

// Доступ к элементам по индексу
function accessElementsByIndex() {
  const array = ['first', 'second', 'third'];
  console.log(array[1]); // 'second'
}

// Обращение к последнему и первому элементам
function accessFirstAndLastElements() {
  const array = [100, 200, 300, 400];
  console.log(array[0]); // 100
  console.log(array[array.length - 1]); // 400
}


// Подглава 2.2: Изменение элементов массива
// Присвоение новых значений элементам массива
function assignNewValues() {
  const array = [1, 2, 3];
  array[1] = 10;
  console.log(array); // [1, 10, 3]
}

// Добавление и удаление элементов массива
function addAndRemoveElements() {
  const array = [1, 2, 3];
  array.push(4); // добавление
  console.log(array); // [1, 2, 3, 4]
  array.pop(); // удаление
  console.log(array); // [1, 2, 3]
}

// Изменение размера массива
function changeArraySize() {
  const array = [1, 2, 3, 4, 5];
  array.length = 3;
  console.log(array); // [1, 2, 3]
}


// Подглава 3.1: Итерация по массиву
// Метод forEach()
function forEachExample() {
  const array = [10, 20, 30];
  array.forEach((item, index) => {
    console.log(`Index: ${index}, Value: ${item}`);
  });
  // Index: 0, Value: 10
  // Index: 1, Value: 20
  // Index: 2, Value: 30
}

// Метод map()
function mapExample() {
  const array = [1, 2, 3];
  const doubled = array.map(num => num * 2);
  console.log(doubled); // [2, 4, 6]
}

// Метод filter()
function filterExample() {
  const array = [1, 2, 3, 4, 5];
  const evenNumbers = array.filter(num => num % 2 === 0);
  console.log(evenNumbers); // [2, 4]
}

// Метод reduce()
function reduceExample() {
  const array = [1, 2, 3, 4];
  const sum = array.reduce((total, current) => total + current, 0);
  console.log(sum); // 10
}

// Подглава 3.2: Добавление и удаление элементов
// Метод push()
function pushExample() {
  const array = [1, 2, 3];
  array.push(4);
  console.log(array); // [1, 2, 3, 4]
}

// Метод pop()
function popExample() {
  const array = [1, 2, 3, 4];
  array.pop();
  console.log(array); // [1, 2, 3]
}

// Метод shift()
function shiftExample() {
  const array = [1, 2, 3, 4];
  array.shift();
  console.log(array); // [2, 3, 4]
}

// Метод unshift()
function unshiftExample() {
  const array = [1, 2, 3];
  array.unshift(0);
  console.log(array); // [0, 1, 2, 3]
}


// Подглава 3.3: Изменение массива
// Метод splice()
function spliceExample() {
  const array = [1, 2, 3, 4, 5];
  array.splice(2, 1, 'three'); // начиная с индекса 2, удаляем 1 элемент и вставляем 'three'
  console.log(array); // [1, 2, 'three', 4, 5]
}

// Метод slice()
function sliceExample() {
  const array = [1, 2, 3, 4, 5];
  const sliced = array.slice(1, 3); // копируем элементы с индекса 1 по индекс 3 (не включая)
  console.log(sliced); // [2, 3]
}

// Метод concat()
function concatExample() {
  const array1 = [1, 2];
  const array2 = [3, 4];
  const combined = array1.concat(array2);
  console.log(combined); // [1, 2, 3, 4]
}

// Метод join()
function joinExample() {
  const array = ['a', 'b', 'c'];
  const joined = array.join('-');
  console.log(joined); // 'a-b-c'
}


// Подглава 3.4: Поиск элементов
// Методы indexOf()
function indexOfExample() {
  const array = [1, 2, 3, 4, 2];
  const index = array.indexOf(2);
  console.log(index); // 1
}

// Методы lastIndexOf()
function lastIndexOfExample() {
  const array = [1, 2, 3, 4, 2];
  const index = array.lastIndexOf(2);
  console.log(index); // 4
}

// Методы includes()
function includesExample() {
  const array = [1, 2, 3, 4];
  const hasTwo = array.includes(2);
  console.log(hasTwo); // true
}

// Методы find()
function findExample() {
  const array = [1, 2, 3, 4];
  const found = array.find(num => num > 2);
  console.log(found); // 3
}

// Методы findIndex()
function findIndexExample() {
  const array = [1, 2, 3, 4];
  const index = array.findIndex(num => num > 2);
  console.log(index); // 2
}


// Подглава 3.5: Сортировка массива
// Методы sort()
function sortExample() {
  const array = [3, 1, 4, 1, 5, 9];
  array.sort((a, b) => a - b);
  console.log(array); // [1, 1, 3, 4, 5, 9]
}

// Методы reverse()
function reverseExample() {
  const array = [1, 2, 3];
  array.reverse();
  console.log(array); // [3, 2, 1]
}


// Глава 4: Многомерные массивы
// Подглава 4.1: Определение и создание многомерных массивов
// Что такое многомерные массивы?
// Многомерные массивы — это массивы, содержащие другие массивы в качестве элементов.

function defineMultidimensionalArray() {
  const multiArray = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  console.log(multiArray); // [[1, 2], [3, 4], [5, 6]]
}

// Создание многомерных массивов в JavaScript
function createMultidimensionalArray() {
  const array = new Array(3).fill(null).map(() => new Array(2).fill(0));
  console.log(array); // [[0, 0], [0, 0], [0, 0]]
}


// Подглава 4.2: Доступ к элементам многомерных массивов
// Индексация элементов многомерных массивов
function accessMultidimensionalArray() {
  const array = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  console.log(array[0][1]); // 2
}

// Обход элементов многомерных массивов
function iterateMultidimensionalArray() {
  const array = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  array.forEach(subArray => {
    subArray.forEach(element => {
      console.log(element); // 1 2 3 4 5 6
    });
  });
}


// Подглава 4.3: Преобразование многомерных массивов
// Преобразование многомерных массивов в одномерные
function flattenMultidimensionalArray() {
  const array = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  const flatArray = array.flat();
  console.log(flatArray); // [1, 2, 3, 4, 5, 6]
}

// Преобразование одномерных массивов в многомерные
function chunkArray() {
  const array = [1, 2, 3, 4, 5, 6];
  const chunkSize = 2;
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }
  console.log(chunkedArray); // [[1, 2], [3, 4], [5, 6]]
}


// Глава 5: Практическое применение массивов
// Подглава 5.1: Работа с данными форм
// Хранение данных форм в массивах
function storeFormData() {
  const formData = [];
  function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.target;
    const data = new FormData(formElement);
    const formDataObject = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });
    formData.push(formDataObject);
    console.log(formData);
  }
  // Элемент формы для примера
  const formElement = document.createElement('form');
  formElement.addEventListener('submit', handleSubmit);
}

// Обработка данных форм с помощью методов массивов
function processFormData() {
  const formData = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 }
  ];
  const names = formData.map(data => data.name);
  console.log(names); // ['John', 'Jane']
}


// Подглава 5.2: Фильтрация и сортировка данных
// Фильтрация данных на основе пользовательского ввода
function filterData(input) {
  const data = [1, 2, 3, 4, 5];
  const filtered = data.filter(num => num > input);
  console.log(filtered); // если input = 3, то [4, 5]
}

// Сортировка данных для отображения на странице
function sortData() {
  const data = [5, 3, 8, 1, 2];
  const sorted = data.sort((a, b) => a - b);
  console.log(sorted); // [1, 2, 3, 5, 8]
}


// Подглава 5.3: Создание динамического контента
// Использование массивов для генерации списков, таблиц и других элементов
function generateList() {
  const items = ['item1', 'item2', 'item3'];
  const listElement = document.createElement('ul');
  items.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    listElement.appendChild(listItem);
  });
  document.body.appendChild(listElement);
}

// Динамическое добавление и удаление элементов на основе массивов
function dynamicUpdate() {
  const items = ['item1', 'item2', 'item3'];
  const listElement = document.createElement('ul');
  document.body.appendChild(listElement);

  function updateList(newItem) {
    items.push(newItem);
    const listItem = document.createElement('li');
    listItem.textContent = newItem;
    listElement.appendChild(listItem);
  }

  function removeItem() {
    items.pop();
    listElement.removeChild(listElement.lastChild);
  }

  updateList('item4'); // добавление нового элемента
  removeItem(); // удаление последнего элемента
}


// Глава 6: Оптимизация и отладка массивов
// Подглава 6.1: Оптимизация производительности
// Использование эффективных методов массивов
function optimizeArrayMethods() {
  const largeArray = new Array(1000000).fill(1);
  const doubled = largeArray.map(num => num * 2);
  console.log(doubled.length); // 1000000
}

// Избегание лишних операций с массивами
function avoidRedundantOperations() {
  const array = [1, 2, 3, 4, 5];
  // Неоптимально: двойной проход по массиву
  const evenNumbers = array.filter(num => num % 2 === 0).map(num => num * 2);
  console.log(evenNumbers); // [4, 8]

  // Оптимально: один проход по массиву
  const evenNumbersOptimized = array.reduce((acc, num) => {
    if (num % 2 === 0) {
      acc.push(num * 2);
    }
    return acc;
  }, []);
  console.log(evenNumbersOptimized); // [4, 8]
}


// Подглава 6.2: Отладка массивов
// Использование консоли разработчика для анализа массивов
function debugArray() {
  const array = [10, 20, 30];
  console.log(array);
  // Использование консоли разработчика для проверки состояния массива
  debugger;
  array.push(40);
  console.log(array);
}

// Вывод элементов массивов для проверки значений
function logArrayElements() {
  const array = ['a', 'b', 'c'];
  array.forEach((item, index) => {
    console.log(`Index: ${index}, Value: ${item}`);
  });
  // Index: 0, Value: a
  // Index: 1, Value: b
  // Index: 2, Value: c
}