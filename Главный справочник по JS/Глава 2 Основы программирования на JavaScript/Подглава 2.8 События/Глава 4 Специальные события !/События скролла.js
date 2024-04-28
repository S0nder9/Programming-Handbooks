// Подглава 4.3: События скролла

// Событие скролла страницы
window.addEventListener('scroll', () => {
    console.log('Произошло скроллирование страницы');
});

// Событие скролла внутри элемента
const scrollableElement = document.getElementById('scrollable');
scrollableElement.addEventListener('scroll', () => {
    console.log('Произошло скроллирование внутри элемента');
});
