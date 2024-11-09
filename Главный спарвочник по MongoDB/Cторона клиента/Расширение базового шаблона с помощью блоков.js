// Глава 2: Создание клиентской части - Расширение базового шаблона с помощью блоков

// В этой главе мы рассмотрим, как можно расширять базовый шаблон с помощью блоков.
// Использование блоков позволяет нам создавать динамические страницы, наследующие структуру из основного шаблона, и при этом добавлять или изменять контент на каждой странице.

// Пример шаблона с расширением базового шаблона:

// 1. Основной шаблон (base.pug)
const fs = require('fs');

const baseTemplate = `
doctype html
html(lang="en")
    head
        title Natours | #{title}
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        link(rel="stylesheet" href="css/style.css")
        link(rel="shortcut icon" href="image/icon.png" type="image/png")

    body
        include _header

        block content 
            h1 Default Content

        include _footer
`;

// 2. Расширение базового шаблона на странице (tour-review.pug)
const tourReviewTemplate = `
extends base

block content
    h1 This is the tour review
    p This is the detailed review of the tour package.
    button(class="btn btn-primary") Book Now
`;

// Используем шаблоны для рендеринга страниц
fs.writeFileSync('base.pug', baseTemplate);
fs.writeFileSync('tour-review.pug', tourReviewTemplate);

// Пример для серверного рендеринга с использованием Express.js
const express = require('express');
const app = express();
const pug = require('pug');

// Устанавливаем Pug как движок шаблонов
app.set('view engine', 'pug');
app.set('views', './views');

// Страница обзора тура
app.get('/tour-review', (req, res) => {
  res.render('tour-review', { title: 'Tour Review' });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
