// Подглава 4.3: Загрузка данных с сервера

// Применение циклов при работе с AJAX и Fetch API
// Циклы могут быть использованы для повторяющихся запросов к серверу при загрузке данных с использованием AJAX или Fetch API.

// Пример: загрузка и отображение списка пользователей с использованием Fetch API
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    let html = '<ul>';
    for (let user of users) {
        html += `<li>${user.name}</li>`;
    }
    html += '</ul>';

    document.getElementById('userList').innerHTML = html;
}

fetchUsers();

// Параллельная загрузка и обработка данных
// Циклы также могут использоваться для параллельной загрузки данных с нескольких источников и их последующей обработки.

// Пример: параллельная загрузка и отображение списка пользователей и постов
async function fetchUsersAndPosts() {
    const usersPromise = fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
    const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());

    const [users, posts] = await Promise.all([usersPromise, postsPromise]);

    let usersHtml = '<h2>Users</h2><ul>';
    for (let user of users) {
        usersHtml += `<li>${user.name}</li>`;
    }
    usersHtml += '</ul>';

    let postsHtml = '<h2>Posts</h2><ul>';
    for (let post of posts) {
        postsHtml += `<li>${post.title}</li>`;
    }
    postsHtml += '</ul>';

    document.getElementById('userData').innerHTML = usersHtml;
    document.getElementById('postData').innerHTML = postsHtml;
}

fetchUsersAndPosts();

// Примеры использования циклов при получении и отображении данных
// - Загрузка и отображение списка товаров в интернет-магазине.
// - Получение и отображение новостей с различных новостных источников.
// - Загрузка и отображение списка друзей или подписчиков социальной сети.
