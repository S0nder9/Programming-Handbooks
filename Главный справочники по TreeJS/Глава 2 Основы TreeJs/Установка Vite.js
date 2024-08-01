// Глава 2: Основы Three.js - Установка Vite

// Three.js - это мощная библиотека для создания 3D-графики в браузере с использованием WebGL.
// Чтобы начать работу с Three.js, можно использовать Vite - современный инструмент для сборки, который обеспечивает быструю настройку и разработку.

// Установка Vite:
// 1. Убедитесь, что у вас установлен Node.js.
// 2. Создайте новый проект с помощью Vite.

// Шаги для установки и настройки Vite:

// 1. Откройте терминал и выполните следующую команду для создания нового проекта с Vite:
$ npm create vite@latest

// 2. Введите имя вашего проекта, например "threejs-project":
// Project name: threejs-project

// 3. Перейдите в каталог вашего проекта:
$ cd threejs-project

// 4. Установите зависимости:
$ npm install

// 5. Запустите сервер разработки:
$ npm run dev

// Vite создаст новый проект и запустит сервер разработки, который будет доступен по адресу http://localhost:3000.

// Установка Three.js:
// 1. Добавьте Three.js в ваш проект с помощью NPM:
$ npm install three

// Использование Three.js в вашем проекте:

// 1. Создайте новый файл, например `main.js`, и импортируйте Three.js:
import * as THREE from 'three';

// 2. Создайте базовую сцену, камеру и рендерер:
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. Добавьте куб в сцену:
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 4. Создайте функцию анимации:
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// 5. Запустите анимацию:
animate();

// Обновите `index.html`, чтобы подключить ваш скрипт:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js with Vite</title>
</head>
<body>
  <script type="module" src="/src/main.js"></script>
</body>
</html>

// Итог:
// Используя Vite, вы можете быстро настроить проект и начать работу с Three.js.
// Следуя этим шагам, вы сможете создать базовую 3D-сцену и запустить её в браузере.
