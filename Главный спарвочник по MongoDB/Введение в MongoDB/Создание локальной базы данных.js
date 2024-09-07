// Глава 1: Введение в MongoDB - Создание локальной базы данных

// MongoDB - это популярная NoSQL база данных, которая использует гибкий, документ-ориентированный подход к хранению данных.
// В этой главе мы рассмотрим, как установить MongoDB на локальную машину и создать первую базу данных.

// 1. Установка MongoDB
// Прежде чем начать работать с MongoDB, необходимо установить её на локальную машину.
// На официальном сайте MongoDB (https://www.mongodb.com/try/download/community) можно скачать установочный пакет для вашей операционной системы.

// После установки убедитесь, что MongoDB работает корректно, запустив команду в терминале:
mongod --version

// Если MongoDB установлена корректно, вы увидите информацию о версии MongoDB.

// 2. Запуск MongoDB
// После установки MongoDB необходимо запустить сервер MongoDB. Это можно сделать, выполнив команду:
mongod

// Эта команда запустит MongoDB сервер, который будет прослушивать соединения на порту 27017 по умолчанию.

// 3. Подключение к MongoDB с помощью mongo shell
// Mongo shell - это интерактивная командная оболочка для работы с MongoDB.
// Чтобы подключиться к локальному серверу MongoDB, откройте новый терминал и выполните команду:
mongo

// После этого вы увидите приглашение mongo shell, где можно вводить команды для работы с базой данных.

// 4. Создание первой базы данных
// В MongoDB базы данных создаются автоматически при добавлении в них данных.
// Для создания новой базы данных сначала необходимо переключиться на неё с помощью команды `use`:
use myFirstDatabase

// Это переключит вас на базу данных `myFirstDatabase`. Если базы данных с таким именем не существует, MongoDB создаст её автоматически, когда вы добавите в неё данные.

// 5. Добавление данных в коллекцию
// В MongoDB данные хранятся в коллекциях, которые аналогичны таблицам в реляционных базах данных.
// Чтобы добавить данные в коллекцию, используйте команду `insertOne`:
// Пример добавления документа в коллекцию `users`:
db.users.insertOne({ name: "John", age: 30, email: "john@example.com" })

// Если коллекции `users` не существует, MongoDB создаст её автоматически вместе с новым документом.

// 6. Просмотр данных
// Чтобы просмотреть данные в коллекции, используйте команду `find`:
// Пример вывода всех документов в коллекции `users`:
db.users.find().pretty()

// Команда `pretty()` форматирует вывод данных для лучшей читаемости.

// 7. Обновление данных
// MongoDB позволяет обновлять существующие документы с помощью команды `updateOne` или `updateMany`.
// Пример обновления документа в коллекции `users`, где `name` равно "John":
db.users.updateOne({ name: "John" }, { $set: { age: 31 } })

// 8. Удаление данных
// Чтобы удалить данные из коллекции, используйте команду `deleteOne` или `deleteMany`.
// Пример удаления документа из коллекции `users`, где `name` равно "John":
db.users.deleteOne({ name: "John" })

// 9. Удаление базы данных
// Если вы хотите удалить базу данных, используйте команду `dropDatabase`:
// Пример удаления текущей базы данных:
db.dropDatabase()

// Итог:
// В этой главе мы рассмотрели, как установить MongoDB на локальную машину, запустить сервер MongoDB, создать первую базу данных, добавить, обновить и удалить данные.
// MongoDB предоставляет гибкий и мощный инструмент для работы с данными, что делает его отличным выбором для различных приложений.
