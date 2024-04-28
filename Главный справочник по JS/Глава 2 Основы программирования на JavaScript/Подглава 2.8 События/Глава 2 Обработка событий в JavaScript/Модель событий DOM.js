// Подглава 2.2: Модель событий DOM

// Всплытие и перехват событий
// Всплытие событий в DOM означает, что событие сначала обрабатывается на самом вложенном элементе, а затем поднимается по иерархии DOM до корневого элемента (вверх). 
// Перехват событий позволяет обработать событие на самом корневом элементе перед его достижением целевого элемента.

// Пример:

// HTML-разметка
 <div id="outer">
    <div id="inner">Нажми меня</div>
</div> 

// JavaScript-обработчики событий
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');

outer.addEventListener('click', () => {
    console.log('Обработчик события внешнего элемента (outer)');
}, false); // фаза всплытия

inner.addEventListener('click', (event) => {
    console.log('Обработчик события внутреннего элемента (inner)');
    // Остановить всплытие события
    event.stopPropagation();
}, false); // фаза всплытия

// При клике на внутренний элемент (inner) сначала будет вызван его обработчик события, 
// а затем обработчик события внешнего элемента (outer).

// Отмена действия по умолчанию и предотвращение всплытия
// Для предотвращения действия по умолчанию и всплытия события используются методы preventDefault() и stopPropagation() соответственно.

// Пример:

// HTML-разметка
    <a id="link" href="https://example.com">Ссылка</a>

// JavaScript-обработчик события
const link = document.getElementById('link');

link.addEventListener('click', (event) => {
    // Отменить переход по ссылке
    event.preventDefault();
    console.log('Переход по ссылке предотвращен');
}, false);
