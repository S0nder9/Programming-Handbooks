// Глава 1: Введение в MongoDB (mongoose) - Моделирование экскурсий, Гиды, Рефераты для детей

// В этой главе мы познакомимся с MongoDB и библиотекой Mongoose, которая позволяет эффективно моделировать данные в MongoDB.
// Мы создадим структуру базы данных для моделирования экскурсий, гидов, а также рефератов для детей, связанных с экскурсиями.

// Создание модели Экскурсии (Tour):
// Эта модель представляет данные об экскурсиях, включая поле guides для хранения списка гидов, которые связаны с конкретной экскурсией.
// Мы также добавим связь между экскурсиями и пользователями (guides), используя ссылки на модель User.

const mongoose = require('mongoose');

// Схема для модели Экскурсии
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Экскурсия должна иметь название'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Экскурсия должна иметь длительность'],
  },
  difficulty: {
    type: String,
    required: [true, 'Укажите уровень сложности'],
    enum: {
      values: ['легкий', 'средний', 'сложный'],
      message: 'Сложность может быть легкой, средней или сложной',
    },
  },
  price: {
    type: Number,
    required: [true, 'Экскурсия должна иметь цену'],
  },
  // Связь с гидом, используя ObjectId, который ссылается на модель User
  guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

// Создание модели Tour на основе схемы tourSchema
const Tour = mongoose.model('Tour', tourSchema);

// Создание модели User (Гид):
// Эта модель представляет гидов, которые проводят экскурсии.
// Мы будем использовать ObjectId, чтобы установить связь с экскурсиями, на которых гиды работают.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя гида обязательно'],
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

// Пример использования моделей:
// Допустим, мы хотим создать новый тур и назначить гида на этот тур. Для этого мы добавим ID пользователя в массив guides.

async function createTourWithGuides() {
  // Создаем гидов
  const guide1 = await User.create({ name: 'John Doe', role: 'guide' });
  const guide2 = await User.create({ name: 'Jane Smith', role: 'lead-guide' });

  // Создаем тур с гидом
  const tour = await Tour.create({
    name: 'Экскурсия по древнему городу',
    duration: 5,
    difficulty: 'средний',
    price: 150,
    guides: [guide1._id, guide2._id],
  });

  console.log('Новая экскурсия с гидами:', tour);
}

// Вызов функции для создания тура с гидами
createTourWithGuides()
  .then(() => console.log('Экскурсия успешно создана'))
  .catch(error => console.error('Ошибка при создании экскурсии:', error));

// Итог:
// Мы создали две модели - Tour и User - и установили связь между ними.
// Поле guides в модели Tour позволяет связывать экскурсии с гидами, используя ссылки на объекты User.
// Такое моделирование данных позволяет нам легко создавать и управлять связями между экскурсиями и гидами.
