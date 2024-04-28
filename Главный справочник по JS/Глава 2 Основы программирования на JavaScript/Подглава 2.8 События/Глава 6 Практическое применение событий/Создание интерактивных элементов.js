// Подглава 6.3: Создание интерактивных элементов

// Разработка игр, слайдеров, аккордеонов и других интерактивных компонентов с использованием событий
// События позволяют создавать интерактивные компоненты, такие как игры, слайдеры, аккордеоны и многие другие.

// Пример: создание простого слайдера
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    // Скрываем все слайды
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });
    // Показываем текущий слайд
    slides[index].style.display = 'block';
}

// Инициализация: показываем первый слайд
showSlide(currentSlide);

// Навигация по слайдам с помощью кнопок "Назад" и "Вперед"
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

prevButton.addEventListener('click', function() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', function() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});
