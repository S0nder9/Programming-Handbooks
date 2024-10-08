// Глава 1: Введение в MongoDB - CRUD Запрос (чтение) документов в cmd

// MongoDB - это NoSQL база данных, которая использует документы в формате JSON для хранения данных.
// В этой главе мы рассмотрим, как выполнять операции чтения документов в MongoDB через командную строку (cmd) и использовать операторы, такие как $query, $and и $or.

// Подключение к MongoDB
// Прежде всего, убедитесь, что MongoDB установлен и запущен на вашем компьютере.
// Для подключения к MongoDB используйте команду mongo в командной строке:
mongo

// После запуска mongo вы получите доступ к MongoDB shell, где сможете выполнять команды для работы с базой данных.

// Чтение документов в MongoDB
// Для выполнения операций чтения используйте команду find(). Это позволяет вам извлекать документы из коллекций.

// 1. Чтение всех документов из коллекции
// Для извлечения всех документов из коллекции используйте метод find() без параметров:
db.collectionName.find()

// Пример: Получение всех документов из коллекции "users"
db.users.find()

// 2. Чтение с условиями (фильтрация)
// Вы можете добавить условия в метод find(), чтобы извлекать только те документы, которые соответствуют определенным критериям.
// Пример: Получение всех документов, где поле "age" равно 30
db.users.find({ age: 30 })

// 3. Использование оператора $query для более сложных запросов
// Оператор $query позволяет выполнять более сложные запросы, включая использование логических операторов.
// Пример: Получение документов, где поле "age" больше 25
db.users.find({ $query: { age: { $gt: 25 } } })

// 4. Использование оператора $and для объединения условий
// Оператор $and позволяет объединять несколько условий в один запрос.
// Пример: Получение документов, где поле "age" больше 25 и поле "status" равно "active"
db.users.find({ $and: [ { age: { $gt: 25 } }, { status: 'active' } ] })

// 5. Использование оператора $or для альтернативных условий
// Оператор $or позволяет выбирать документы, которые соответствуют хотя бы одному из нескольких условий.
// Пример: Получение документов, где поле "age" меньше 20 или поле "status" равно "inactive"
db.users.find({ $or: [ { age: { $lt: 20 } }, { status: 'inactive' } ] })

// 6. Ограничение количества возвращаемых документов
// Используйте метод limit() для ограничения числа возвращаемых документов.
// Пример: Получение только первых 5 документов
db.users.find().limit(5)

// 7. Сортировка результатов
// Используйте метод sort() для сортировки результатов по определенным полям.
// Пример: Сортировка документов по полю "age" в порядке возрастания
db.users.find().sort({ age: 1 })

// Пример: Сортировка документов по полю "age" в порядке убывания
db.users.find().sort({ age: -1 })

// 8. Проекция полей (выборочные поля)
// Используйте проекцию для выбора только определенных полей из документов.
// Пример: Получение документов с полями "name" и "age", исключая остальные поля
db.users.find({}, { name: 1, age: 1 })

// Итог:
// В MongoDB вы можете выполнять чтение документов с помощью метода find(), добавляя различные параметры для фильтрации, сортировки и ограничения результатов.
// Операторы, такие как $query, $and и $or, позволяют создавать более сложные запросы для извлечения данных.
// Понимание этих инструментов поможет вам эффективно работать с данными в MongoDB.
