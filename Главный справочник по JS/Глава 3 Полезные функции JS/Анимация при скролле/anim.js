// Для каждого элемента с классом "revealedBox"
document.querySelectorAll('.revealedBox').forEach(function(element) {
    var childrenSpan = element.querySelectorAll('span').length; // Получаем количество дочерних элементов span

    // Добавляем класс в зависимости от количества дочерних элементов span
    element.classList.add('childrenSpan-' + childrenSpan);

    // Если элемент находится в видимой области экрана, добавляем класс 'revealedBox-in'
    if (window.scrollY + window.innerHeight > element.offsetTop + element.offsetHeight) {
        element.classList.add('revealedBox-in');
    }
});

// Добавляем прослушиватель события прокрутки окна
window.addEventListener('scroll', function() {
    // Для каждого элемента с классом "revealedBox"
    document.querySelectorAll('.revealedBox').forEach(function(element) {
        // Если элемент находится в видимой области экрана, добавляем класс 'revealedBox-in'
        if (window.scrollY + window.innerHeight > element.offsetTop) {
            element.classList.add('revealedBox-in');
        }
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     let animationText = document.querySelector(".animationText");

//     function scrollEvent() {
//         let rect = animationText.getBoundingClientRect(); // Получаем координаты элемента .animationText
//         let posYRect = rect.top;
//         let posY = window.scrollY;

//         console.log("Координаты прокрутки Y:", posY);
//         console.log("Координаты верхнего левого угла элемента по оси Y:", posYRect);

//         if (posY >= posYRect && posY <= posYRect + animationText.offsetHeight + document.documentElement.clientHeight) {
//             console.log("Элемент .animationText виден на экране.");
//             animationText.classList.add("animate"); // Пример добавления класса для запуска CSS-анимации
//         } else {
//             console.log("Элемент .animationText не виден на экране.");
//             animationText.classList.remove("animate"); // Пример удаления класса для остановки CSS-анимации
//         }

//         console.log(animationText.offsetHeight);
//     }
    
//     // Вызываем функцию scrollEvent при загрузке страницы
//     scrollEvent();

//     // Добавляем прослушиватель события прокрутки (scroll)
//     window.addEventListener("scroll", scrollEvent);

// });