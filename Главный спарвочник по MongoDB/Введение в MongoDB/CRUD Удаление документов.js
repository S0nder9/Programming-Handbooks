// Глава 1: Введение в MongoDB - CRUD Удаление документов в cmd

// В MongoDB операция удаления документов позволяет удалить один или несколько документов из коллекции.
// В этой главе мы рассмотрим, как выполнять операции удаления документов из командной строки (cmd) с использованием MongoDB Shell.

// 1. Подключение к базе данных MongoDB
// Прежде чем выполнять операции удаления, необходимо подключиться к вашему серверу MongoDB.
// Для этого используйте команду `mongo` в командной строке:
mongo

// Вы также можете подключиться к удаленному серверу, указав URL подключения:
// mongo mongodb://username:password@host:port/database

// 2. Выбор базы данных
// После подключения выберите базу данных, с которой будете работать, с помощью команды `use`:
use myDatabase

// 3. Удаление одного документа
// Для удаления одного документа используйте метод `deleteOne`.
// Например, чтобы удалить документ с полем `name`, равным `John`, используйте следующую команду:
db.myCollection.deleteOne({ name: 'John' })

// 4. Удаление нескольких документов
// Для удаления нескольких документов используйте метод `deleteMany`.
// Например, чтобы удалить все документы с полем `status`, равным `inactive`, используйте следующую команду:
db.myCollection.deleteMany({ status: 'inactive' })

// 5. Удаление всех документов в коллекции
// Если вы хотите удалить все документы из коллекции, но сохранить саму коллекцию, используйте метод `deleteMany` без условия:
// Это удалит все документы, но оставит коллекцию пустой:
db.myCollection.deleteMany({})

// 6. Удаление коллекции
// Если вы хотите полностью удалить коллекцию, включая все её документы, используйте метод `drop`:
// Это удалит коллекцию и все её документы:
db.myCollection.drop()

// Итог:
// Операции удаления в MongoDB позволяют удалять один или несколько документов, очищать коллекцию или удалять коллекцию целиком.
// Знание этих операций поможет вам управлять данными в MongoDB более эффективно.
