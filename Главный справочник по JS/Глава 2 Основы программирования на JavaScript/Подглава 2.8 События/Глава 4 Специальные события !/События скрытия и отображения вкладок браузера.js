// Событие скрытия вкладки
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Вкладка была скрыта');
    } else {
        console.log('Вкладка была отображена');
    }
});
