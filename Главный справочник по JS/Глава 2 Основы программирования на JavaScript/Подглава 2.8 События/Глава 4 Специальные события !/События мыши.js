// Подглава 4.1: События мыши

// Клики, двойные клики, наведения, увод мыши, перемещение и т. д.

// Обработка клика на элементе
element.addEventListener('click', (event) => {
    console.log('Клик на элементе');
});

// Обработка двойного клика на элементе
element.addEventListener('dblclick', (event) => {
    console.log('Двойной клик на элементе');
});

// Обработка наведения мыши на элемент
element.addEventListener('mouseover', (event) => {
    console.log('Наведение мыши на элемент');
});

// Обработка увода мыши с элемента
element.addEventListener('mouseout', (event) => {
    console.log('Увод мыши с элемента');
});

// Обработка перемещения мыши на элементе
element.addEventListener('mousemove', (event) => {
    console.log('Перемещение мыши на элементе');
});

// Координаты курсора мыши при событиях
element.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX; // координата X курсора относительно окна браузера
    const mouseY = event.clientY; // координата Y курсора относительно окна браузера
    console.log('Координаты мыши:', mouseX, mouseY);
});
