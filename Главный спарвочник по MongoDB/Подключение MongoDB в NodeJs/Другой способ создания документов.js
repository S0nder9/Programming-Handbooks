// Глава 1: Введение в MongoDB - Другой способ создания документов

// MongoDB — это нереляционная (NoSQL) база данных, которая хранит данные в формате документов JSON-подобных объектов (BSON).
// В MongoDB создание документов может быть выполнено несколькими способами.
// В этой главе мы рассмотрим другой способ создания документов, помимо использования метода insertOne().

// 1. Метод insertMany()
// Этот метод позволяет вставить несколько документов в коллекцию сразу. Это удобно, когда нужно добавить несколько записей за один запрос.

// Пример использования insertMany():
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017'; // Адрес сервера MongoDB
const client = new MongoClient(uri);

async function createDocuments() {
  try {
    await client.connect();
    const database = client.db('myDatabase');
    const collection = database.collection('users');

    const documents = [
      { name: 'Alice', age: 25, email: 'alice@example.com' },
      { name: 'Bob', age: 30, email: 'bob@example.com' },
      { name: 'Charlie', age: 35, email: 'charlie@example.com' }
    ];

    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`, result.insertedIds);
  } finally {
    await client.close();
  }
}

createDocuments().catch(console.dir);

// 2. Метод updateOne() с опцией upsert
// Еще один способ создания документа — использовать метод updateOne() с опцией upsert.
// Эта опция позволяет создать новый документ, если он не существует в базе данных, или обновить существующий документ, если он уже есть.

// Пример использования updateOne() с upsert:
async function upsertDocument() {
  try {
    await client.connect();
    const database = client.db('myDatabase');
    const collection = database.collection('users');

    const filter = { email: 'alice@example.com' };
    const update = { $set: { name: 'Alice', age: 26 } };
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);
    if (result.upsertedCount > 0) {
      console.log(`A new document was created with id ${result.upsertedId._id}`);
    } else {
      console.log('Existing document was updated');
    }
  } finally {
    await client.close();
  }
}

upsertDocument().catch(console.dir);

// 3. Использование ODM (Mongoose)
// Альтернативный способ создания документов в MongoDB — использование Object-Document Mapping (ODM) библиотеки, такой как Mongoose.
// Mongoose позволяет создавать модели и работать с ними как с объектами в JavaScript, что упрощает создание и управление документами.

// Пример создания документа с использованием Mongoose:
const mongoose = require('mongoose');

async function createWithMongoose() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myDatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const userSchema = new mongoose.Schema({
      name: String,
      age: Number,
      email: String
    });

    const User = mongoose.model('User', userSchema);

    const newUser = new User({
      name: 'David',
      age: 40,
      email: 'david@example.com'
    });

    const savedUser = await newUser.save();
    console.log('User created:', savedUser);
  } finally {
    await mongoose.disconnect();
  }
}

createWithMongoose().catch(console.dir);

// Итог:
// В MongoDB есть несколько способов создания документов.
// Помимо стандартного метода insertOne(), можно использовать insertMany() для добавления нескольких документов одновременно, метод updateOne() с опцией upsert для создания или обновления документов, а также библиотеку Mongoose для работы с моделями данных.
// Эти подходы делают MongoDB гибким инструментом для работы с данными.
