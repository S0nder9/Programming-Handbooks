// Глава 2: Создание клиентской части - Включение файлов в шаблоны Pug
// Включение файлов в шаблоны Pug помогает разделять код на модули и поддерживать структуру приложения.
// В этом примере мы рассмотрим, как использовать директиву "include" для включения других файлов в шаблон Pug.

const pug = require('pug');

// Пример шаблона Pug, включающий файлы для заголовка и футера:

const template = `
doctype html
html(lang="en")
    head
        title Natours
        meta(charset="UTF-8")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        link(rel="stylesheet" href="css/style.css")
        link(rel="shortcut icon" href="image/icon.png" type="image/png")

    body
        include _header  // Включение файла _header.pug
        section.overview
            h1 Tour
        include _footer  // Включение файла _footer.pug
`;

// Пример структуры файлов:
// - views/
//   - index.pug
//   - _header.pug
//   - _footer.pug
//   - css/
//     - style.css
//   - image/
//     - icon.png

// В этом примере предполагается, что файлы _header.pug и _footer.pug находятся в той же папке, что и основной файл шаблона (например, index.pug).
// Когда вы используете директиву include, Pug заменяет эту директиву содержимым указанного файла.

const compiledFunction = pug.compile(template);

// Отображение скомпилированного HTML:
console.log(compiledFunction());
