// Глава 1: Введение в MongoDB - Что такое Мангуст

// Mongoose — это объектно-документная модель (ODM) для MongoDB и Node.js. 
// Mongoose предоставляет интерфейс для взаимодействия с базой данных MongoDB, 
// который упрощает управление данными и добавляет полезные функции, такие как схемы и валидацию.

// Зачем использовать Mongoose?
// 1. Схемы данных
// В MongoDB данные хранятся в виде документов BSON (Binary JSON), что делает структуру данных гибкой. 
// Однако это может привести к проблемам с согласованностью данных. Mongoose решает эту проблему, 
// предоставляя возможность определить структуру документов с помощью схем.

// Пример создания схемы Mongoose:
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Определение схемы для модели "User"
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18 },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Создание модели на основе схемы
const User = mongoose.model('User', userSchema);

// 2. Валидация данных
// Mongoose предоставляет встроенные механизмы валидации для того, чтобы данные, отправленные в базу данных, 
// соответствовали определенным правилам. Например, мы можем указать, что поле email должно быть уникальным, 
// а возраст не может быть меньше 18 лет.

// Пример использования встроенной валидации:
const newUser = new User({ name: 'John', age: 17, email: 'john@example.com' });
newUser.save((err) => {
  if (err) {
    console.error('Validation failed:', err.message); // Ошибка валидации возраста
  } else {
    console.log('User saved successfully');
  }
});

// 3. Методы модели и виртуальные свойства
// Mongoose позволяет добавлять к моделям методы и виртуальные свойства. Это удобно, когда нужно вычислять 
// или обрабатывать данные при их запросе или сохранении.

// Пример добавления метода к модели:
userSchema.methods.getGreeting = function() {
  return `Hello, my name is ${this.name}`;
};

const user = new User({ name: 'Jane', age: 22, email: 'jane@example.com' });
console.log(user.getGreeting()); // Выведет: Hello, my name is Jane

// 4. Работа с ассоциациями и связями
// Mongoose позволяет создавать связи между коллекциями, что упрощает управление связанными данными.
// Например, можно связать коллекцию пользователей с коллекцией "Постов".

// Пример создания связи между пользователем и постами:
const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

// Теперь можно создавать посты и связывать их с конкретными пользователями:
const post = new Post({
  title: 'My First Post',
  content: 'This is the content of my first post',
  author: user._id
});

// 5. Простота работы с асинхронными операциями
// Mongoose поддерживает Promises, что упрощает выполнение асинхронных операций с базой данных.

// Пример асинхронного сохранения документа:
async function saveUser() {
  try {
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

// Итог:
// Mongoose — это мощный инструмент для работы с MongoDB в приложениях на Node.js.
// Он упрощает взаимодействие с базой данных, добавляет схемы, валидацию, методы и поддерживает асинхронные операции.
// Mongoose помогает разработчикам поддерживать структуру данных и улучшает читаемость кода.
