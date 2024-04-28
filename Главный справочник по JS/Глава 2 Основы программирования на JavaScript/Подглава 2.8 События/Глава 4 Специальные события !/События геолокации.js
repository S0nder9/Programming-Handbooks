// Событие успешного получения геопозиции
navigator.geolocation.getCurrentPosition((position) => {
    console.log('Текущие координаты:', position.coords.latitude, position.coords.longitude);
});

// Событие ошибки при получении геопозиции
navigator.geolocation.watchPosition(() => {
    console.log('Произошла ошибка при получении геопозиции');
});
