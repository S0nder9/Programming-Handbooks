// Глава 12: Интеграция Canvas с другими технологиями
// Подглава 12.2: Интеграция с WebGL

// WebGL (Web Graphics Library) - это API для рендеринга 2D и 3D графики в браузере с использованием HTML5 Canvas.
// WebGL позволяет использовать графический процессор (GPU) для ускоренного рендеринга, что позволяет создавать сложные визуализации и анимации.

/////////////////////////////////////////
// Основы использования WebGL на Canvas //
/////////////////////////////////////////

// 1. Создание контекста WebGL
// Для начала нужно создать элемент Canvas и получить контекст WebGL.

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');

if (!gl) {
  console.error('WebGL не поддерживается');
}

// 2. Настройка шейдеров
// Шейдеры - это небольшие программы, которые выполняются на графическом процессоре. Они определяют, как вершины и пиксели обрабатываются для создания изображения.

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  void main() {
    gl_FragColor = vec4(1, 0, 0, 1); // красный цвет
  }
`;

// Функция для создания шейдера
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Ошибка компиляции шейдера:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// 3. Создание программы шейдеров
// Программа шейдеров связывает вершины и фрагменты шейдеров вместе.

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Ошибка связывания программы:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

const program = createProgram(gl, vertexShader, fragmentShader);

// 4. Настройка буфера
// Буферы используются для хранения данных вершин.

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Загрузка данных вершин в буфер
const positions = [
  -0.5, -0.5,
   0.5, -0.5,
  -0.5,  0.5,
   0.5,  0.5,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// 5. Рендеринг сцены
// Связывание атрибутов и рендеринг сцены.

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 1); // черный фон
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);

const positionLocation = gl.getAttribLocation(program, 'a_position');
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

//////////////////////////////////////////
// Примеры 3D-графики на Canvas с WebGL //
//////////////////////////////////////////

// Для создания 3D-графики с помощью WebGL нужно работать с матрицами и векторами для определения позиций и проекций объектов.

import { mat4 } from 'gl-matrix'; // Предположим, что вы используете библиотеку gl-matrix для работы с матрицами.

const vertexShaderSource3D = `
  attribute vec4 a_position;
  uniform mat4 u_matrix;
  void main() {
    gl_Position = u_matrix * a_position;
  }
`;

const fragmentShaderSource3D = `
  void main() {
    gl_FragColor = vec4(0, 0, 1, 1); // синий цвет
  }
`;

const vertexShader3D = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource3D);
const fragmentShader3D = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource3D);
const program3D = createProgram(gl, vertexShader3D, fragmentShader3D);

const positionBuffer3D = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer3D);

const positions3D = [
  0, 0, 0,
  0, 0.5, 0,
  0.7, 0, 0,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions3D), gl.STATIC_DRAW);

const positionLocation3D = gl.getAttribLocation(program3D, 'a_position');

const matrixLocation = gl.getUniformLocation(program3D, 'u_matrix');

const matrix = mat4.create();
mat4.perspective(matrix, Math.PI / 4, gl.canvas.width / gl.canvas.height, 0.1, 100);
mat4.translate(matrix, matrix, [-0.5, -0.5, -1.5]);

gl.useProgram(program3D);

gl.enableVertexAttribArray(positionLocation3D);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer3D);
gl.vertexAttribPointer(positionLocation3D, 3, gl.FLOAT, false, 0, 0);

gl.uniformMatrix4fv(matrixLocation, false, matrix);

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, 3);

// Итог:
// WebGL предоставляет мощные возможности для создания 3D-графики в браузере с использованием Canvas.
// Использование WebGL включает настройку шейдеров, программ шейдеров, буферов и рендеринг сцены.
// Примеры включают как 2D, так и 3D графику, что делает WebGL гибким инструментом для создания сложных визуализаций.
