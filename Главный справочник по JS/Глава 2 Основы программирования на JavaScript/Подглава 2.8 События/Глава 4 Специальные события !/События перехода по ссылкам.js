// Подглава 4.3: События перехода по ссылкам

// Событие перед переходом по ссылке
document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        console.log('Был сделан клик по ссылке:', event.target.href);
    }
});
