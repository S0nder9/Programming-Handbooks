// Глава 1: Введение в MongoDB - Чтение документов

// MongoDB — это популярная NoSQL база данных, которая хранит данные в виде документов JSON-подобного формата (BSON).
// Одной из ключевых операций в MongoDB является чтение документов из коллекции.
// В этой главе мы рассмотрим основы чтения данных в MongoDB.

// 1. Подключение к MongoDB
// Для работы с MongoDB на Node.js используется библиотека `mongodb`, которая предоставляет API для работы с базой данных.
// Пример подключения к MongoDB с использованием MongoDB Node.js Driver:

const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('myDatabase'); // Подключение к базе данных
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// 2. Чтение всех документов из коллекции
// Метод `find()` позволяет получить все документы из коллекции.
// Пример чтения всех документов из коллекции `users`:

async function readDocuments() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const users = await usersCollection.find({}).toArray(); // Преобразуем курсор в массив
  console.log('All users:', users);
}

// 3. Чтение документов с использованием фильтра
// Вы можете использовать фильтр для поиска конкретных документов, например, найти всех пользователей старше 30 лет.
// Пример использования фильтра для чтения документов:

async function readFilteredDocuments() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const usersOver30 = await usersCollection.find({ age: { $gt: 30 } }).toArray(); // Фильтр по возрасту
  console.log('Users over 30:', usersOver30);
}

// 4. Чтение одного документа
// Если необходимо получить только один документ, можно использовать метод `findOne()`.
// Пример чтения одного документа:

async function readOneDocument() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const user = await usersCollection.findOne({ name: 'John Doe' }); // Поиск по имени
  console.log('Found user:', user);
}

// 5. Ограничение количества возвращаемых документов
// Метод `limit()` позволяет ограничить количество возвращаемых документов.
// Пример чтения первых 5 пользователей:

async function readLimitedDocuments() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const limitedUsers = await usersCollection.find({}).limit(5).toArray(); // Ограничение на 5 документов
  console.log('First 5 users:', limitedUsers);
}

// 6. Сортировка документов
// Метод `sort()` позволяет сортировать возвращаемые документы по определенному полю.
// Пример сортировки пользователей по возрасту в порядке возрастания:

async function readSortedDocuments() {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');

  const sortedUsers = await usersCollection.find({}).sort({ age: 1 }).toArray(); // Сортировка по возрасту (1 - по возрастанию)
  console.log('Users sorted by age:', sortedUsers);
}

// 7. Обработка ошибок
// Важно обрабатывать ошибки при чтении данных из MongoDB для предотвращения сбоев в работе приложения.
// Пример обработки ошибки при чтении документов:

async function readDocumentsWithErrorHandling() {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');

    const users = await usersCollection.find({}).toArray();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error reading documents:', error);
  }
}

// Итог:
// MongoDB предоставляет мощные инструменты для чтения документов из коллекций.
// Вы можете использовать методы `find()`, `findOne()`, а также фильтры, сортировку и ограничения для эффективной работы с данными.
