// Глава 1: Введение в MongoDB - Обзор обработки ошибок

// MongoDB - это документно-ориентированная база данных, которая позволяет хранить данные в формате JSON-подобных документов.
// В процессе работы с MongoDB могут возникать различные ошибки, которые важно обрабатывать для обеспечения стабильности приложения.
// В этом обзоре мы рассмотрим основные типы ошибок и способы их обработки при взаимодействии с MongoDB.

// 1. Ошибки подключения к базе данных
// Проблема: Невозможно подключиться к базе данных из-за неверного URI, неправильных учетных данных или недоступности сервера.
// Решение: Используйте обработку ошибок при подключении и выведите полезные сообщения в лог.
// Пример подключения с обработкой ошибок:
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// 2. Ошибки валидации данных
// Проблема: Данные, переданные в модель MongoDB, не соответствуют ожидаемому формату или структуре, что приводит к ошибке валидации.
// Решение: Определите схемы с валидаторами и используйте обработку ошибок при сохранении данных.
// Пример схемы с валидацией и обработка ошибок при сохранении:
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 }
});

const User = mongoose.model('User', userSchema);

const newUser = new User({ name: '', age: -5 });
newUser.save()
  .then(() => console.log('User saved successfully'))
  .catch((error) => console.error('Validation error:', error.errors));

// 3. Ошибки выполнения операций с базой данных
// Проблема: Ошибки могут возникать при выполнении операций, таких как поиск, обновление или удаление данных (например, из-за отсутствия документа).
// Решение: Обрабатывайте ошибки операций, чтобы предотвращать неожиданные сбои в приложении.
// Пример обработки ошибки при поиске документа:
User.findById('invalidId')
  .then((user) => {
    if (!user) {
      throw new Error('User not found');
    }
    console.log('User found:', user);
  })
  .catch((error) => console.error('Database operation error:', error.message));

// 4. Ошибки уникальности данных
// Проблема: Попытка вставки данных с уникальным индексом, который уже существует, приводит к ошибке дублирования.
// Решение: Используйте индексы и обрабатывайте ошибки уникальности.
// Пример создания уникального индекса и обработка ошибки:
const emailSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }
});

const Email = mongoose.model('Email', emailSchema);

const emailInstance = new Email({ email: 'example@example.com' });
emailInstance.save()
  .catch((error) => {
    if (error.code === 11000) {
      console.error('Duplicate email error:', error.message);
    } else {
      console.error('Error saving email:', error);
    }
  });

// 5. Ошибки при работе с коллекциями и индексами
// Проблема: Ошибки могут возникать при создании коллекций или индексов, если не указаны необходимые параметры или нарушены ограничения.
// Решение: Используйте асинхронные функции и обработку ошибок при работе с коллекциями и индексами.
// Пример создания индекса с обработкой ошибок:
User.collection.createIndex({ name: 1 }, { unique: true })
  .then(() => console.log('Index created successfully'))
  .catch((error) => console.error('Error creating index:', error));

// Итог:
// Ошибки при работе с MongoDB могут возникать на разных этапах: при подключении, валидации данных, выполнении операций, соблюдении уникальности данных и управлении индексами.
// Правильная обработка ошибок помогает сделать приложение более устойчивым и удобным для отладки, предоставляя полезные сообщения и предотвращая сбои.
