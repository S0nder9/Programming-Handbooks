// Глава 2: Основы Three.js - Настройка Three.js

// Three.js - это популярная библиотека JavaScript для создания 3D-графики в веб-браузерах.
// Она предоставляет высокоуровневые абстракции для работы с WebGL и упрощает создание и управление 3D-сценами.
// В этой главе мы рассмотрим, как настроить Three.js для начала работы.

// Шаг 1: Установка Three.js
// Вы можете установить Three.js через npm или подключить его напрямую через CDN.

// Установка через npm:
$ npm install three

// Подключение через CDN:
// Добавьте следующий тег <script> в ваш HTML файл:
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

// Шаг 2: Создание базовой сцены
// Для создания базовой сцены в Three.js, вам нужно выполнить следующие шаги:

// 1. Создайте сцену
const scene = new THREE.Scene();

// 2. Создайте камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. Создайте рендерер и установите его размеры
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 4. Добавьте рендерер в DOM
document.body.appendChild(renderer.domElement);

// Шаг 3: Добавление объектов в сцену
// Создайте геометрию и материал для вашего объекта, а затем добавьте его в сцену.

// Пример создания простого куба:
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Шаг 4: Настройка камеры
// Установите позицию камеры так, чтобы она видела ваш объект:
camera.position.z = 5;

// Шаг 5: Анимация и рендеринг
// Создайте функцию для обновления и рендеринга сцены в цикле анимации.

function animate() {
  requestAnimationFrame(animate);

  // Вращайте куб для демонстрации анимации
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Рендерите сцену с учетом камеры
  renderer.render(scene, camera);
}

animate();

// Итог:
// Настройка Three.js включает установку библиотеки, создание сцены, камеры и рендерера, добавление объектов в сцену и настройку анимации.
// С помощью этих базовых шагов вы можете начать создавать 3D-графику и анимацию в веб-браузере.
