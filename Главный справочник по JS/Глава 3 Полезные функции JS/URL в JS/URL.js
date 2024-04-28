// Создание объекта URL из строки URL-адреса
const urlString = 'https://www.example.com/path?key=value#fragment';
const url = new URL(urlString);

console.log(url); // Выведет объект URL

// Получение компонентов URL-адреса
console.log(url.protocol); // Выведет: "https:"
console.log(url.host); // Выведет: "www.example.com"
console.log(url.pathname); // Выведет: "/path"
console.log(url.search); // Выведет: "?key=value"
console.log(url.hash); // Выведет: "#fragment"

// Изменение параметров URL-адреса
url.searchParams.append('newParam', 'newValue');
console.log(url.href); // Выведет: "https://www.example.com/path?key=value&newParam=newValue#fragment"

// Разбор параметров URL-адреса
url.searchParams.forEach((value, key) => {
    console.log(key, value);
});

// Создание нового URL-адреса
const newUrl = new URL('https://www.example.com');
newUrl.pathname = '/newPath';
newUrl.searchParams.set('key', 'updatedValue');
console.log(newUrl.href); // Выведет: "https://www.example.com/newPath?key=updatedValue"

// Открытие URl
const urlMain = new URL("https://www.youtube.com/?hl=RU");
body = document.createElement("p");
document.body.append(urlMain)

document.addEventListener("click", function () {
    window.open(urlMain);
});