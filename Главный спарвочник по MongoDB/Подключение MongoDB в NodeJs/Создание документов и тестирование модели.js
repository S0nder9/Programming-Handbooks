// Глава 1: Введение в MongoDB - Создание документов и тестирование модели

// MongoDB является популярной NoSQL базой данных, которая хранит данные в формате BSON (Binary JSON).
// В этой главе мы рассмотрим, как создавать документы в MongoDB и тестировать модели данных.

// 1. Создание документов
// Документы в MongoDB представляют собой JSON-объекты, которые хранят данные.
// Для создания документов вы можете использовать методы вставки, такие как insertOne и insertMany.

// Пример создания и вставки одного документа в коллекцию:
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

(async () => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to database');
  
  const db = client.db(dbName);
  const collection = db.collection('myCollection');
  
  // Создание документа
  const document = { name: 'John Doe', age: 30, email: 'john.doe@example.com' };
  
  // Вставка документа
  const result = await collection.insertOne(document);
  console.log('Document inserted:', result.insertedId);
  
  await client.close();
})();

// Пример создания и вставки нескольких документов в коллекцию:
(async () => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to database');
  
  const db = client.db(dbName);
  const collection = db.collection('myCollection');
  
  // Создание документов
  const documents = [
    { name: 'Alice', age: 25, email: 'alice@example.com' },
    { name: 'Bob', age: 28, email: 'bob@example.com' }
  ];
  
  // Вставка документов
  const result = await collection.insertMany(documents);
  console.log('Documents inserted:', result.insertedIds);
  
  await client.close();
})();

// 2. Тестирование модели
// Для тестирования модели данных вы можете использовать различные инструменты и методы.
// Пример использования Mongoose - популярной библиотеки ODM (Object Data Modeling) для MongoDB в Node.js.

// Установка Mongoose:
// npm install mongoose

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/myDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Определение схемы модели
const userSchema = new Schema({
  name: String,
  age: Number,
  email: String
});

// Создание модели
const User = mongoose.model('User', userSchema);

// Создание и сохранение документа
const user = new User({ name: 'Charlie', age: 35, email: 'charlie@example.com' });

user.save()
  .then(doc => {
    console.log('Document saved:', doc);
  })
  .catch(err => {
    console.error('Error saving document:', err);
  })
  .finally(() => {
    mongoose.connection.close();
  });

// 3. Проверка и отладка данных
// Чтобы проверить и отладить данные, вы можете использовать MongoDB Compass или командную строку MongoDB.
// Команды для проверки данных в командной строке MongoDB:
// - Просмотр всех документов в коллекции: db.myCollection.find().pretty()
// - Поиск документов по условию: db.myCollection.find({ name: 'John Doe' }).pretty()

// Итог:
// В этой главе мы рассмотрели создание документов в MongoDB и тестирование модели данных с использованием Mongoose.
// Понимание этих основ поможет эффективно работать с MongoDB в ваших приложениях.
