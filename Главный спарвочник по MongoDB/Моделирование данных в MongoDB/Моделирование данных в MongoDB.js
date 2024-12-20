// Глава 1: Введение в MongoDB
// Моделирование данных в MongoDB

// MongoDB - это документно-ориентированная база данных, которая позволяет гибко и динамично хранить данные.
// Моделирование данных в MongoDB играет ключевую роль в проектировании структуры данных, повышая производительность и удобство работы с базой данных.

// Основные концепции моделирования данных в MongoDB:

// 1. Документы и коллекции
// MongoDB хранит данные в виде документов JSON-подобного формата (BSON), что позволяет гибко определять структуру.
// Каждый документ хранится в коллекции, которая представляет собой аналог таблицы в реляционных базах данных.
// Пример документа в MongoDB:
{
    _id: ObjectId("60a7c2f4b7e4f9e6dc7a3d9a"),
    name: "Alice",
    age: 29,
    hobbies: ["reading", "hiking"]
  }
  
  // 2. Встроенные документы (Embedded Documents)
  // В MongoDB вы можете встраивать связанные данные внутри документов, что позволяет сохранять сложные структуры.
  // Это часто используется для данных, которые логически связаны и используются вместе.
  // Пример использования встроенных документов:
  {
    _id: ObjectId("60a7c2f4b7e4f9e6dc7a3d9b"),
    name: "Bob",
    contactInfo: {
      email: "bob@example.com",
      phone: "123-456-7890"
    }
  }
  
  // 3. Связи между документами: встраивание vs. ссылки
  // MongoDB поддерживает два способа моделирования отношений между данными - встраивание и ссылки (референсы).
  // Встраивание полезно, когда данные запрашиваются вместе, а ссылки - когда данные хранятся отдельно для уменьшения дублирования.
  // Пример использования ссылок (референсов):
  {
    _id: ObjectId("60a7c2f4b7e4f9e6dc7a3d9c"),
    name: "Charlie",
    orderIds: [ObjectId("60a7c2f4b7e4f9e6dc7a3d9d"), ObjectId("60a7c2f4b7e4f9e6dc7a3d9e")]
  }
  
  // 4. Использование массивов
  // MongoDB поддерживает массивы, что позволяет хранить несколько значений в одном поле.
  // Это особенно удобно для хранения списков, таких как заказы пользователя или теги.
  // Пример использования массива в документе:
  {
    _id: ObjectId("60a7c2f4b7e4f9e6dc7a3d9f"),
    productName: "Laptop",
    tags: ["electronics", "computers", "gadgets"]
  }
  
  // 5. Декомпозиция данных
  // В MongoDB иногда целесообразно разделить данные на несколько коллекций.
  // Это особенно актуально для данных с изменяющейся структурой, чтобы избегать дублирования и повышения гибкости.
  // Пример декомпозиции:
  // Коллекция пользователей:
  {
    _id: ObjectId("60a7c2f4b7e4f9e6dc7a3d9g"),
    name: "Diana",
    age: 32
  }
  
  // Коллекция адресов (связана по userId):
  {
    _id: ObjectId("60a7c2f4b7e4f9e6dc7a3d9h"),
    userId: ObjectId("60a7c2f4b7e4f9e6dc7a3d9g"),
    address: "123 Main St, Springfield"
  }
  
  // 6. Индексы для оптимизации запросов
  // MongoDB поддерживает индексы, что помогает ускорить поиск и выполнение операций.
  // При моделировании данных важно учитывать, какие поля будут часто использоваться для поиска и добавлять индексы на них.
  // Пример создания индекса для поля name:
  db.users.createIndex({ name: 1 });
  
  // Итог:
  // Моделирование данных в MongoDB позволяет гибко проектировать структуру базы данных.
  // Используя такие подходы, как встраивание, ссылки, массивы и индексы, можно создать оптимизированное и удобное в использовании хранилище данных.
  