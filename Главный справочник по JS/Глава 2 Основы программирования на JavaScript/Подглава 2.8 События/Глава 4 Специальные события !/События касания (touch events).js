// Событие касания элемента
element.addEventListener('touchstart', () => {
    console.log('Начало касания элемента');
});

// Событие отрыва пальца от элемента
element.addEventListener('touchend', () => {
    console.log('Отрыв пальца от элемента');
});

// Событие перемещения пальца по элементу
element.addEventListener('touchmove', () => {
    console.log('Перемещение пальца по элементу');
});

// Событие отмены касания (происходит, если касание прервано)
element.addEventListener('touchcancel', () => {
    console.log('Касание было прервано');
});
