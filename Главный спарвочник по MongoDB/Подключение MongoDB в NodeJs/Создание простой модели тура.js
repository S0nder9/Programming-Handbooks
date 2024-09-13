// Глава 1: Введение в MongoDB - Создание простой модели тура

// MongoDB — это NoSQL база данных, которая использует документы в формате BSON для хранения данных.
// В этой главе мы рассмотрим, как создать простую модель тура с использованием MongoDB и Mongoose.

// Основные шаги:

// 1. Установка и настройка
// Перед началом работы необходимо установить MongoDB и Mongoose. Mongoose — это библиотека для работы с MongoDB в Node.js.

// Установка MongoDB:
$ sudo apt-get install -y mongodb

// Установка Mongoose:
$ npm install mongoose

// 2. Подключение к MongoDB
// Для подключения к базе данных MongoDB в вашем приложении на Node.js используйте Mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tourApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// 3. Определение схемы и модели
// Схема в Mongoose определяет структуру документов в коллекции. Модель создается на основе схемы и представляет коллекцию в базе данных.

// Определение схемы для тура:
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // продолжительность тура в днях
  price: { type: Number, required: true }, // цена тура
  locations: [String], // массив с названиями локаций
  date: { type: Date, default: Date.now } // дата создания тура
});

// Создание модели на основе схемы:
const Tour = mongoose.model('Tour', tourSchema);

// 4. Использование модели
// Теперь, когда у нас есть модель, мы можем создавать, читать, обновлять и удалять документы в коллекции.

// Пример создания нового тура:
const newTour = new Tour({
  name: 'Great Adventure',
  duration: 7,
  price: 1499,
  locations: ['Paris', 'Rome', 'Berlin']
});

newTour.save((err, tour) => {
  if (err) return console.error(err);
  console.log('Tour created:', tour);
});

// Пример поиска всех туров:
Tour.find((err, tours) => {
  if (err) return console.error(err);
  console.log('All tours:', tours);
});

// Пример обновления тура:
Tour.updateOne({ name: 'Great Adventure' }, { price: 1399 }, (err, result) => {
  if (err) return console.error(err);
  console.log('Tour updated:', result);
});

// Пример удаления тура:
Tour.deleteOne({ name: 'Great Adventure' }, (err) => {
  if (err) return console.error(err);
  console.log('Tour deleted');
});

// Итог:
// Мы рассмотрели, как установить и настроить MongoDB, подключиться к базе данных с помощью Mongoose, создать простую модель тура, и выполнять основные операции CRUD (создание, чтение, обновление, удаление) с использованием этой модели.
// MongoDB и Mongoose предоставляют мощные инструменты для работы с данными в приложениях Node.js.
