// Глава 1: Введение в MongoDB - Улучшение API: Ограничение полей

// При работе с API важно предоставлять только необходимые данные клиенту.
// Ограничение полей, возвращаемых из базы данных MongoDB, является важной практикой для повышения производительности и обеспечения безопасности.
// В этой главе мы рассмотрим, как можно ограничить количество возвращаемых полей с помощью MongoDB.

// 1. Зачем ограничивать поля в API?
// - Снижение объема передаваемых данных, что ускоряет загрузку и уменьшает нагрузку на сеть.
// - Улучшение безопасности: скрытие чувствительных данных (например, паролей, токенов).
// - Упрощение структуры данных, делая API более понятным и удобным для использования.

// 2. Использование метода `projection` в MongoDB
// В MongoDB для ограничения полей используется метод `projection`. Он позволяет указать, какие поля будут включены или исключены из результата запроса.

// Пример использования `projection` для возврата только определенных полей:
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function getUsers() {
  try {
    await client.connect();
    const database = client.db('mydatabase');
    const users = database.collection('users');

    // Используем projection для возвращения только имени и электронной почты
    const projection = { name: 1, email: 1, _id: 0 }; // 1 - включаем поле, 0 - исключаем поле
    const result = await users.find({}, { projection }).toArray();
    console.log(result);
  } finally {
    await client.close();
  }
}

getUsers();

// В этом примере из базы данных возвращаются только поля `name` и `email`, поле `_id` исключено.

// 3. Ограничение полей в API с помощью Mongoose
// Mongoose — это популярная библиотека для работы с MongoDB в Node.js, которая также позволяет ограничивать возвращаемые поля с помощью метода `select`.

// Пример ограничения полей с помощью Mongoose:
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

async function getUsersMongoose() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    
    // Возвращаем только поля name и email
    const users = await User.find().select('name email -_id'); // '-_id' исключает поле _id
    console.log(users);
  } finally {
    await mongoose.disconnect();
  }
}

getUsersMongoose();

// В этом примере Mongoose возвращает только поля `name` и `email`, исключая поле `_id`.

// 4. Ограничение полей на стороне клиента
// Клиентское приложение может запросить только нужные ему поля, отправив соответствующий запрос на сервер.
// Например, на фронтенде с помощью Fetch API можно запросить только необходимые данные:

fetch('/api/users?fields=name,email')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// На сервере можно обработать этот запрос и применить фильтрацию полей в зависимости от переданных параметров:

app.get('/api/users', async (req, res) => {
  const fields = req.query.fields ? req.query.fields.split(',').join(' ') : '';
  
  try {
    const users = await User.find().select(fields);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Таким образом, клиент может запросить только те данные, которые ему нужны, что делает API более гибким.

// 5. Скрытие чувствительных данных
// Важно помнить о безопасности при возврате данных через API. Например, пароли, токены и другая конфиденциальная информация не должны передаваться клиенту.
// Вы можете исключить такие поля с помощью `projection` или `select`.

// Пример скрытия пароля в Mongoose:
const userSchemaWithHiddenPassword = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: false }, // поле password не будет возвращаться при запросах
  age: Number
});

const UserWithHiddenPassword = mongoose.model('UserWithHiddenPassword', userSchemaWithHiddenPassword);

async function getUsersWithoutPassword() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase');
    
    // Пароль не будет возвращен благодаря select: false в схеме
    const users = await UserWithHiddenPassword.find();
    console.log(users);
  } finally {
    await mongoose.disconnect();
  }
}

getUsersWithoutPassword();

// В этом примере пароли пользователей не будут возвращаться при запросах к базе данных благодаря настройке `select: false` в схеме Mongoose.

// Итог:
// Ограничение полей — это важная практика при создании API для повышения производительности, безопасности и удобства использования.
// MongoDB позволяет ограничивать поля с помощью `projection`, а Mongoose — с помощью метода `select`. Это помогает контролировать, какие данные будут доступны клиенту, и исключить чувствительные данные, такие как пароли.
