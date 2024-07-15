// Глава 4: Работа с цветом и стилями в Canvas

// Подглава 4.2: Работа с градиентами

// В HTML5 Canvas API градиенты используются для создания плавных переходов между цветами.
// Существует два основных типа градиентов: линейные и радиальные.
// В этой подглаве мы рассмотрим создание этих градиентов и их применение к фигурам на холсте.

// 1. Создание линейных и радиальных градиентов

// Линейные градиенты создаются с помощью метода `createLinearGradient(x0, y0, x1, y1)`.
// Они плавно переходят от одного цвета к другому по прямой линии между двумя точками.

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Создание линейного градиента от верхнего левого угла к нижнему правому углу
const linearGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

// Добавление цветовых остановок к градиенту
linearGradient.addColorStop(0, 'red'); // Начальный цвет (красный)
linearGradient.addColorStop(1, 'blue'); // Конечный цвет (синий)

// Применение линейного градиента к фигуре
ctx.fillStyle = linearGradient;

// Рисуем прямоугольник, который будет заполнен градиентом
ctx.fillRect(10, 10, 200, 100);

// Радиальные градиенты создаются с помощью метода `createRadialGradient(x0, y0, r0, x1, y1, r1)`.
// Они плавно переходят от одного цвета к другому по окружности от внутреннего круга к внешнему.

const radialGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 150);

// Добавление цветовых остановок к радиальному градиенту
radialGradient.addColorStop(0, 'yellow'); // Начальный цвет (жёлтый)
radialGradient.addColorStop(1, 'green');  // Конечный цвет (зелёный)

// Применение радиального градиента к фигуре
ctx.fillStyle = radialGradient;

// Рисуем круг, который будет заполнен градиентом
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, 2 * Math.PI);
ctx.fill();

// 2. Применение градиентов к фигурам

// Чтобы применить градиенты к различным фигурам, достаточно установить свойство `fillStyle` или `strokeStyle` градиентом и нарисовать фигуру.
// Это свойство можно использовать как для заливки, так и для обводки фигур.

// Пример применения линейного градиента для заливки прямоугольника и радиального градиента для заливки круга:
const ctx2 = canvas.getContext('2d');

// Создание линейного градиента
const linearGradient2 = ctx2.createLinearGradient(0, 0, canvas.width, canvas.height);
linearGradient2.addColorStop(0, 'purple');
linearGradient2.addColorStop(1, 'orange');

// Применение градиента и рисование прямоугольника
ctx2.fillStyle = linearGradient2;
ctx2.fillRect(10, 10, 200, 100);

// Создание радиального градиента
const radialGradient2 = ctx2.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, 150);
radialGradient2.addColorStop(0, 'pink');
radialGradient2.addColorStop(1, 'cyan');

// Применение градиента и рисование круга
ctx2.fillStyle = radialGradient2;
ctx2.beginPath();
ctx2.arc(canvas.width / 2, canvas.height / 2, 150, 0, 2 * Math.PI);
ctx2.fill();

// Итог:
// Градиенты в Canvas API позволяют создавать красивые и сложные визуальные эффекты с плавными переходами между цветами.
// Линейные градиенты создают плавные переходы по прямой линии, а радиальные градиенты — по окружности.
// Вы можете применять градиенты к различным фигурам, используя их для создания динамичных и привлекательных графических элементов.
