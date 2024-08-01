// Глава 2: Основы Three.js - Основы Three.js

// Three.js - это мощная библиотека JavaScript, которая упрощает создание и отображение 3D-графики в браузере.
// Она предоставляет множество инструментов и функций для работы с 3D-сценами, камерами, светом и анимацией.

// Как начать работу с Three.js:
// 1. Установите Three.js через NPM или подключите его через CDN.
// 2. Создайте сцену, камеру и рендерер.
// 3. Добавьте объекты в сцену и начните рендеринг.

// Пример простого приложения на Three.js:

// 1. Установка Three.js через NPM:
$ npm install three

// 2. Импорт и настройка Three.js:

import * as THREE from 'three';

// Создание сцены
const scene = new THREE.Scene();

// Создание камеры
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Создание рендерера
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Добавление объекта (куб)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Позиционирование камеры
camera.position.z = 5;

// Функция анимации
function animate() {
  requestAnimationFrame(animate);

  // Вращение куба
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Рендеринг сцены с камерой
  renderer.render(scene, camera);
}

// Запуск анимации
animate();

// Итог:
// Three.js позволяет легко создавать и отображать 3D-графику в браузере.
// Основные шаги включают создание сцены, камеры и рендерера, добавление объектов и рендеринг сцены.
// С помощью Three.js можно создавать сложные и интерактивные 3D-приложения.
