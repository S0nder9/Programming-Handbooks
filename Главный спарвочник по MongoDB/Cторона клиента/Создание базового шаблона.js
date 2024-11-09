// Глава 2: Создание клиентской части - Создание базового шаблона
// Пример базового HTML-шаблона для проекта "Natours" с использованием Pug-шаблонизатора.
// Pug позволяет создавать упрощенный и читаемый HTML-код, с минимальным использованием тэгов и атрибутов.

// Основная структура документа с подключением CSS-стилей и иконки сайта.
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
    //- Заголовок с навигацией по туру и пользователю
    header.header
      nav.nav.nav--tour
        a.nav__el(href="#") All tours

      //- Логотип заголовка
      .header__logo
        img(src="img/logo-white.png" alt="Natours logo")

      nav.nav.nav--user
        //- Для отображения кнопок входа и регистрации
        button.nav__el.nav__el-cta Log in
        button.nav__el.nav__el-cta Sign up

    //- Основная секция с обзором тура
    section.overview
      h1= "Tour Overview"

    //- Нижний колонтитул с логотипом и навигацией
    footer.footer
      .footer__logo
        img(src="img/logo-green.png" alt="Natours logo")
        
      ul.footer__nav
        li: a(href="#") About us
        li: a(href="#") Download app
        li: a(href="#") Become a guide
        li: a(href="#") Careers
        li: a(href="#") Contact

      //- Авторское право
      p.footer__copyright &copy; by Jonas
`;

module.exports = template;
