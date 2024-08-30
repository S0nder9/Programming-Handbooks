// Глава 7: Расширенные техники работы с JWT
// Подглава 7.3: Пользовательские claims и их использование

// JWT (JSON Web Tokens) позволяет передавать информацию о пользователе и других данных в безопасном и компактном формате.
// Пользовательские claims (требования) могут быть добавлены в JWT для передачи дополнительных данных, которые не включены в стандартные claims.

// 1. Создание пользовательских claims

// Для создания пользовательских claims в JWT, нужно добавить их в payload при создании токена.
// В примере ниже показано, как добавить пользовательские claims в токен с помощью библиотеки `jsonwebtoken` в Node.js.

const jwt = require('jsonwebtoken');

// Создание пользовательских claims
const createToken = (user) => {
  const payload = {
    sub: user.id, // Стандартный claim для идентификации субъекта
    name: user.name, // Пользовательский claim для имени
    role: user.role, // Пользовательский claim для роли
    permissions: user.permissions // Пользовательский claim для разрешений
  };
  
  // Подпись и создание токена
  const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
  return token;
};

// Пример использования функции создания токена
const user = {
  id: '123',
  name: 'Alice',
  role: 'admin',
  permissions: ['read', 'write', 'delete']
};

const token = createToken(user);
console.log('JWT Token:', token);

// 2. Использование пользовательских claims

// После создания JWT с пользовательскими claims, важно уметь извлекать и использовать эти claims на сервере.
// В примере ниже показано, как декодировать токен и извлекать пользовательские claims.

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    console.log('Decoded JWT:', decoded);
    // Доступ к пользовательским claims
    console.log('User ID:', decoded.sub);
    console.log('Name:', decoded.name);
    console.log('Role:', decoded.role);
    console.log('Permissions:', decoded.permissions);
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};

// Пример использования функции проверки токена
const decodedToken = verifyToken(token);
if (decodedToken) {
  // Доступ к пользовательским claims
  console.log(`Welcome ${decodedToken.name}! Your role is ${decodedToken.role}.`);
}

// 3. Практические примеры использования

// Пример 1: Разграничение доступа по ролям
// Используя claims о ролях, можно реализовать контроль доступа к определенным ресурсам.

const checkRole = (token, requiredRole) => {
  const decoded = verifyToken(token);
  if (decoded && decoded.role === requiredRole) {
    console.log(`Access granted for role: ${requiredRole}`);
  } else {
    console.log('Access denied');
  }
};

// Пример использования функции проверки роли
checkRole(token, 'admin'); // Выведет: Access granted for role: admin
checkRole(token, 'user'); // Выведет: Access denied

// Пример 2: Проверка разрешений
// Можно использовать claims о разрешениях для контроля доступа к действиям в приложении.

const checkPermissions = (token, requiredPermissions) => {
  const decoded = verifyToken(token);
  if (decoded && requiredPermissions.every(p => decoded.permissions.includes(p))) {
    console.log('Permissions granted');
  } else {
    console.log('Permissions denied');
  }
};

// Пример использования функции проверки разрешений
checkPermissions(token, ['read', 'write']); // Выведет: Permissions granted
checkPermissions(token, ['read', 'admin']); // Выведет: Permissions denied

// Итог:
// Пользовательские claims позволяют добавлять дополнительные данные в JWT, такие как роли и разрешения.
// Это позволяет гибко управлять доступом и функциональностью в приложениях на основе JWT.
