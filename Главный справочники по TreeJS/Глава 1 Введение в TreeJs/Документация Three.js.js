// Глава 1: Введение в Three.js - Документация Three.js

// Three.js - это библиотека JavaScript, которая используется для создания и отображения 3D графики в веб-браузерах.
// Она упрощает создание сложных 3D сцен, используя WebGL.

// Основные компоненты Three.js:
// 1. Сцена (Scene): контейнер, в котором размещаются все объекты, которые будут отображены.
// 2. Камера (Camera): определяет точку обзора сцены.
// 3. Рендерер (Renderer): отвечает за отрисовку сцены с точки зрения камеры.
// 4. Объекты (Objects): 3D-модели, такие как кубы, сферы, плоскости и т.д.
// 5. Материалы (Materials): определяют, как объекты будут выглядеть (цвет, текстуры, отражения и т.д.).
// 6. Свет (Lights): источники света, которые освещают сцену и объекты в ней.

// Пример простейшей сцены с Three.js:

// Шаг 1: Установка Three.js
// Для установки Three.js можно использовать npm:
$ npm install three

// Шаг 2: Создание базовой сцены

// Импортируйте необходимые компоненты из Three.js
import * as THREE from 'three';

// Создайте сцену
const scene = new THREE.Scene();

// Создайте камеру
const camera = new THREE.PerspectiveCamera(
  75, // угол обзора
  window.innerWidth / window.innerHeight, // соотношение сторон
  0.1, // ближняя плоскость отсечения
  1000 // дальняя плоскость отсечения
);

// Создайте рендерер и добавьте его к документу
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создайте куб
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Позиционируйте камеру
camera.position.z = 5;

// Анимационная функция для рендеринга сцены
function animate() {
  requestAnimationFrame(animate);

  // Анимация куба (вращение)
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Рендеринг сцены с точки зрения камеры
  renderer.render(scene, camera);
}

// Запустите анимацию
animate();

// Итог:
// Three.js позволяет легко создавать 3D графику в веб-браузерах.
// Основные компоненты включают сцену, камеру, рендерер, объекты, материалы и источники света.
// С помощью Three.js можно создавать интерактивные 3D приложения с высокой производительностью.
