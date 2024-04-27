// Подглава 5.2: Фильтрация и сортировка данных

// Фильтрация данных на основе пользовательского ввода
const data = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 },
    { name: 'Emily', age: 27 }
];

// Функция для фильтрации данных по возрасту
function filterDataByAge(data, minAge, maxAge) {
    return data.filter(person => person.age >= minAge && person.age <= maxAge);
}

// Пример использования функции filterDataByAge
const filteredData = filterDataByAge(data, 25, 30);
console.log(filteredData);

// Сортировка данных для отображения на странице
// Предположим, у нас есть список пользователей, которых мы хотим отсортировать по имени
const users = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 },
    { name: 'Emily', age: 27 }
];

// Функция для сортировки пользователей по имени
function sortUsersByName(users) {
    return users.sort((a, b) => a.name.localeCompare(b.name));
}

// Пример использования функции sortUsersByName
const sortedUsers = sortUsersByName(users);
console.log(sortedUsers);
