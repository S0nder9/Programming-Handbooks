// Глава 1: Введение в MongoDB - Удаление документов

// Удаление документов в MongoDB является важной операцией для управления данными.
// MongoDB предоставляет несколько способов удаления документов из коллекций, включая удаление одного документа или нескольких документов, соответствующих критериям запроса.

// 1. Удаление одного документа (deleteOne)
// Метод `deleteOne()` удаляет первый документ, который соответствует условиям запроса. 
// Если существует несколько документов, удовлетворяющих условию, только первый найденный документ будет удален.

// Пример использования `deleteOne()`:
const { MongoClient } = require('mongodb');

async function deleteOneDocument() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Удаление одного документа, где поле `name` равно "John"
    const result = await collection.deleteOne({ name: 'John' });
    console.log('Documents deleted:', result.deletedCount);
  } finally {
    await client.close();
  }
}

deleteOneDocument();

// 2. Удаление нескольких документов (deleteMany)
// Метод `deleteMany()` удаляет все документы, которые соответствуют условиям запроса.
// Это удобно, если вам нужно удалить сразу несколько записей, соответствующих определенным критериям.

// Пример использования `deleteMany()`:
async function deleteManyDocuments() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Удаление всех документов, где поле `age` меньше 18
    const result = await collection.deleteMany({ age: { $lt: 18 } });
    console.log('Documents deleted:', result.deletedCount);
  } finally {
    await client.close();
  }
}

deleteManyDocuments();

// 3. Удаление всех документов в коллекции (drop)
// Если требуется удалить все документы из коллекции, вы можете использовать метод `drop()`, который полностью удаляет коллекцию.
// Этот метод очищает коллекцию, а не только документы.

// Пример использования `drop()`:
async function dropCollection() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Полностью удаляем коллекцию
    await collection.drop();
    console.log('Collection dropped');
  } finally {
    await client.close();
  }
}

dropCollection();

// 4. Обработка ошибок при удалении документов
// При удалении документов могут возникнуть ошибки, связанные с отсутствием соответствующих данных или другими проблемами.
// Важно обрабатывать такие ошибки, чтобы код не завершился сбоем и приложение продолжало работать.

// Пример обработки ошибок при удалении:
async function deleteDocumentWithErrorHandling() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Попытка удаления документа, который не существует
    const result = await collection.deleteOne({ name: 'NonExistentName' });
    if (result.deletedCount === 0) {
      console.log('No documents matched the query.');
    } else {
      console.log('Document deleted');
    }
  } catch (error) {
    console.error('Error during deletion:', error);
  } finally {
    await client.close();
  }
}

deleteDocumentWithErrorHandling();

// Итог:
// Удаление документов в MongoDB можно осуществлять с помощью методов `deleteOne()`, `deleteMany()` и `drop()`.
// Эти методы позволяют гибко управлять удалением данных в базе и обрабатывать возможные ошибки.
// Важно убедиться, что условия запроса правильно определены, чтобы не удалить лишние данные.
