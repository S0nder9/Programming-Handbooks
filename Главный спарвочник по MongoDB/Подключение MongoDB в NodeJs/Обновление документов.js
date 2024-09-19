// Глава 1: Введение в MongoDB - Обновление документов

// В MongoDB обновление документов является важной частью работы с базой данных.
// Оно позволяет изменить существующие данные, не удаляя и не создавая документ заново.
// В этой главе мы рассмотрим основные методы обновления документов в MongoDB.

// 1. Использование метода `updateOne`
// Метод `updateOne` обновляет первый документ, который соответствует критерию поиска.
// Он используется, если нужно обновить только один конкретный документ в коллекции.

// Пример обновления документа с использованием `updateOne`:
const { MongoClient } = require('mongodb');

async function updateDocument() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mydatabase");
    const collection = database.collection("users");

    const filter = { name: "John Doe" };  // Условие поиска документа
    const update = { $set: { age: 30 } };  // Обновляем поле age

    const result = await collection.updateOne(filter, update);
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} was/were updated.`);
  } finally {
    await client.close();
  }
}

updateDocument().catch(console.error);

// 2. Использование метода `updateMany`
// Метод `updateMany` обновляет все документы, которые соответствуют критерию поиска.
// Этот метод используется, если нужно обновить сразу несколько документов.

// Пример обновления нескольких документов с использованием `updateMany`:
async function updateMultipleDocuments() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mydatabase");
    const collection = database.collection("users");

    const filter = { subscribed: true };  // Обновляем всех подписанных пользователей
    const update = { $set: { newsletter: false } };  // Отключаем рассылку

    const result = await collection.updateMany(filter, update);
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} was/were updated.`);
  } finally {
    await client.close();
  }
}

updateMultipleDocuments().catch(console.error);

// 3. Обновление с использованием операторов
// В MongoDB доступны различные операторы для гибкого обновления документов.
// Например, `$set` для замены значений полей, `$inc` для увеличения числовых значений и `$unset` для удаления полей.

// Пример увеличения значения поля с использованием оператора `$inc`:
async function incrementAge() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mydatabase");
    const collection = database.collection("users");

    const filter = { name: "John Doe" };
    const update = { $inc: { age: 1 } };  // Увеличиваем возраст на 1

    const result = await collection.updateOne(filter, update);
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} was/were updated.`);
  } finally {
    await client.close();
  }
}

incrementAge().catch(console.error);

// 4. Обновление с использованием оператора `$setOnInsert`
// Иногда вам может понадобиться обновить документ, если он существует, или вставить новый, если он отсутствует.
// Это можно сделать с помощью метода `updateOne` и оператора `$setOnInsert`.

// Пример использования `$setOnInsert`:
async function upsertDocument() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("mydatabase");
    const collection = database.collection("users");

    const filter = { name: "Jane Doe" };
    const update = {
      $set: { age: 25 },
      $setOnInsert: { createdAt: new Date() }
    };

    const result = await collection.updateOne(filter, update, { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the filter, ${result.modifiedCount} was/were updated. Upsert occurred: ${result.upsertedCount > 0}`);
  } finally {
    await client.close();
  }
}

upsertDocument().catch(console.error);

// Итог:
// Обновление документов в MongoDB может выполняться с помощью методов `updateOne` и `updateMany`, а также различных операторов, таких как `$set`, `$inc`, `$unset` и `$setOnInsert`.
// Эти методы предоставляют гибкие возможности для изменения существующих данных, а также для вставки новых документов в случае необходимости.
