// Глава 1: Введение в Three.js - Разбор примера

// Three.js - это популярная библиотека JavaScript для создания 3D-графики в веб-браузере.
// Она предоставляет множество инструментов для работы с 3D-сценами, объектами, камерами, светом и анимацией.

// В этом разделе мы рассмотрим простой пример использования Three.js для создания базовой 3D-сцены.

// Шаг 1: Подключение Three.js
// Для начала вам нужно подключить Three.js к вашему проекту.
// Вы можете скачать библиотеку с официального сайта или использовать CDN.

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

// Шаг 2: Создание базовой 3D-сцены
// Мы создадим сцену, камеру и рендерер, чтобы начать работу с Three.js.

// <script>
  // Создание сцены
  const scene = new THREE.Scene();

  // Создание камеры (угловое поле зрения 75, соотношение сторон, ближняя и дальняя плоскости отсечения)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  // Создание рендерера и установка его размера
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Шаг 3: Создание объекта
  // Создадим куб и добавим его на сцену.

  // Создание геометрии куба
  const geometry = new THREE.BoxGeometry();

  // Создание материала с цветом
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

  // Создание меша (геометрия + материал)
  const cube = new THREE.Mesh(geometry, material);

  // Добавление куба на сцену
  scene.add(cube);

  // Шаг 4: Позиционирование камеры
  // Переместим камеру, чтобы она смотрела на наш куб.

  camera.position.z = 5;

  // Шаг 5: Анимация
  // Создадим функцию для анимации, которая будет вызываться при каждом кадре.

  function animate() {
    requestAnimationFrame(animate);

    // Вращение куба вокруг своих осей
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Рендеринг сцены с камерой
    renderer.render(scene, camera);
  }

  // Запуск анимации
  animate();
// </script>

// Итог:
// В этом примере мы создали простую 3D-сцену с вращающимся кубом, используя Three.js.
// Мы подключили библиотеку, создали сцену, камеру и рендерер, добавили объект и настроили анимацию.
// Three.js предоставляет множество возможностей для создания сложных 3D-сцен и анимаций в браузере.
