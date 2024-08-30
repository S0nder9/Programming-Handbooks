// Глава 9: Практическое применение JWT
// Подглава 9.1: Примеры реальных проектов с использованием JWT

// JSON Web Tokens (JWT) используются для аутентификации и авторизации в веб-приложениях.
// В этой подглаве рассмотрим несколько реальных примеров проектов, где JWT играет ключевую роль в архитектуре.


// Пример 1: Интернет-магазин

// Архитектура:
// - Фронтенд: React
// - Бекенд: Node.js с Express
// - База данных: MongoDB

// Как используется JWT:
// 1. Пользователи могут зарегистрироваться и войти в систему. После успешной аутентификации сервер генерирует JWT.
// 2. JWT сохраняется на клиенте (например, в localStorage) и используется для авторизации запросов к защищенным маршрутам.
// 3. На сервере каждый запрос к защищенным ресурсам проверяет наличие и действительность JWT в заголовке Authorization.

// Пример кода для генерации и проверки JWT на сервере:
const jwt = require('jsonwebtoken');

// Генерация токена после успешной аутентификации:
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Проверка учетных данных пользователя...
  const token = jwt.sign({ userId: 1 }, 'your-secret-key');
  res.json({ token });
});

// Проверка токена для доступа к защищенным маршрутам:
app.get('/api/orders', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      // Доступ к защищенному ресурсу
      res.json({ orders: [] });
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});


// Пример 2: Система управления контентом (CMS)

// Архитектура:
// - Фронтенд: Angular
// - Бекенд: Node.js с Koa
// - База данных: PostgreSQL

// Как используется JWT:
// 1. Аутентификация пользователей происходит через JWT, который выдается после успешного входа.
// 2. JWT хранится в cookies с флагом HttpOnly для повышения безопасности и используется для авторизации запросов к серверу.
// 3. Сервер проверяет JWT для доступа к административным функциям и редактированию контента.

// Пример кода для генерации и проверки JWT на сервере:
const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const app = new Koa();
const router = new Router();

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  // Проверка учетных данных пользователя...
  const token = jwt.sign({ userId: 1 }, 'your-secret-key');
  ctx.cookies.set('token', token, { httpOnly: true });
  ctx.body = { message: 'Login successful' };
});

router.get('/admin', async (ctx) => {
  const token = ctx.cookies.get('token');
  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) ctx.status = 403;
      else ctx.body = { content: 'Admin content' };
    });
  } else {
    ctx.status = 401;
  }
});

app.use(router.routes());
app.listen(3000);


// Пример 3: Платформа для онлайн-курсов

// Архитектура:
// - Фронтенд: Vue.js
// - Бекенд: Node.js с NestJS
// - База данных: MySQL

// Как используется JWT:
// 1. Пользователи могут зарегистрироваться и получить JWT после подтверждения учетных данных.
// 2. JWT используется для аутентификации и авторизации доступа к курсам, материалам и личному кабинету.
// 3. Бекенд проверяет JWT для защиты пользовательских данных и ресурсов.

// Пример кода для генерации и проверки JWT на сервере:
const { Controller, Post, Get, Req, Res } = require('@nestjs/common');
const jwt = require('jsonwebtoken');

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Req() req, @Res() res) {
    const { username, password } = req.body;
    // Проверка учетных данных пользователя...
    const token = jwt.sign({ userId: 1 }, 'your-secret-key');
    res.json({ token });
  }
}

@Controller('courses')
export class CoursesController {
  @Get()
  getCourses(@Req() req, @Res() res) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      jwt.verify(token, 'your-secret-key', (err, decoded) => {
        if (err) res.status(403).json({ message: 'Forbidden' });
        else res.json({ courses: [] });
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}


// Итог:
// JWT широко используется для управления аутентификацией и авторизацией в различных типах приложений.
// Понимание его применения в реальных проектах помогает эффективно использовать JWT для защиты ресурсов и данных в веб-приложениях.
