// Подглава 4.2: События клавиатуры

// Нажатие клавиш
document.addEventListener('keydown', (event) => {
    console.log('Клавиша нажата:', event.key);
});

// Отпускание клавиш
document.addEventListener('keyup', (event) => {
    console.log('Клавиша отпущена:', event.key);
});

// Нажатие комбинации клавиш
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Предотвращение стандартного действия (например, сохранение страницы)
        console.log('Нажата комбинация Ctrl + S');
    }
});
