// Событие копирования текста
element.addEventListener('copy', () => {
    console.log('Текст был скопирован');
});

// Событие вставки текста
element.addEventListener('paste', () => {
    console.log('Текст был вставлен');
});

// Событие вырезания текста
element.addEventListener('cut', () => {
    console.log('Текст был вырезан');
});
