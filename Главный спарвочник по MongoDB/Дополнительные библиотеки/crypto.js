// Глава 1: Дополнительные библиотеки - crypto
// Библиотека `crypto` предоставляет функционал для работы с криптографией в Node.js.
// Она используется для создания хэшей, генерации случайных чисел, шифрования и дешифрования данных и других криптографических операций.

// Подключение библиотеки crypto
// Библиотека `crypto` является встроенной в Node.js, и ее можно подключить следующим образом:
const crypto = require('crypto');

// 1. Хэширование данных
// Хэширование позволяет преобразовать данные в уникальный зашифрованный формат.
// В Node.js библиотека `crypto` поддерживает различные алгоритмы хэширования, такие как SHA-256, MD5 и др.

// Пример создания хэша с использованием алгоритма SHA-256:
const hash = crypto.createHash('sha256').update('Hello, world!').digest('hex');
console.log('SHA-256 hash:', hash);

// 2. Генерация случайных чисел и байтов
// Генерация случайных чисел и байтов полезна для создания токенов, ключей и других криптографически безопасных значений.
// Библиотека `crypto` предоставляет методы `randomBytes` и `randomInt` для генерации случайных значений.

// Пример генерации случайных байтов:
crypto.randomBytes(16, (err, buffer) => {
  if (err) throw err;
  console.log('Random bytes:', buffer.toString('hex'));
});

// Пример генерации случайного целого числа:
crypto.randomInt(1, 100, (err, num) => {
  if (err) throw err;
  console.log('Random integer between 1 and 100:', num);
});

// 3. Симметричное шифрование и дешифрование
// Симметричное шифрование использует один и тот же ключ для шифрования и дешифрования данных.
// Библиотека `crypto` поддерживает алгоритмы шифрования, такие как AES-256.

// Пример симметричного шифрования с использованием алгоритма AES-256-CBC:
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32); // Ключ должен быть длиной 32 байта
const iv = crypto.randomBytes(16); // Вектор инициализации (IV)

// Функция для шифрования текста
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Функция для дешифрования текста
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

const encryptedText = encrypt('Hello, world!');
console.log('Encrypted text:', encryptedText);
console.log('Decrypted text:', decrypt(encryptedText));

// 4. Ассиметричное шифрование и дешифрование
// Ассиметричное шифрование использует два ключа: открытый и закрытый.
// `crypto` поддерживает алгоритмы ассиметричного шифрования, такие как RSA.

// Генерация пары ключей RSA:
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Шифрование и дешифрование с использованием RSA:
function encryptWithPublicKey(text) {
  return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('hex');
}

function decryptWithPrivateKey(encryptedText) {
  return crypto.privateDecrypt(privateKey, Buffer.from(encryptedText, 'hex')).toString('utf8');
}

const encryptedRSA = encryptWithPublicKey('Hello, world!');
console.log('Encrypted text with RSA:', encryptedRSA);
console.log('Decrypted text with RSA:', decryptWithPrivateKey(encryptedRSA));

// 5. Создание цифровой подписи
// Цифровые подписи используются для проверки подлинности и целостности данных.
// `crypto` позволяет создавать и проверять подписи с помощью таких алгоритмов, как RSA-SHA256.

// Создание цифровой подписи:
const sign = crypto.createSign('SHA256');
sign.update('Message to sign');
const signature = sign.sign(privateKey, 'hex');
console.log('Digital signature:', signature);

// Проверка цифровой подписи:
const verify = crypto.createVerify('SHA256');
verify.update('Message to sign');
const isVerified = verify.verify(publicKey, signature, 'hex');
console.log('Signature verified:', isVerified);

// 6. Криптографические HMAC (Код на основе ключа сообщения)
// HMAC используется для создания хэшированных значений на основе секретного ключа и данных, что позволяет проверить целостность сообщения.

// Пример создания HMAC с использованием алгоритма SHA-256:
const hmac = crypto.createHmac('sha256', 'a secret key');
hmac.update('Hello, world!');
console.log('HMAC:', hmac.digest('hex'));

// Итог:
// Библиотека `crypto` предоставляет множество инструментов для работы с криптографией, включая хэширование, генерацию случайных чисел, симметричное и ассиметричное шифрование, цифровые подписи и HMAC.
// Эти методы широко используются для обеспечения безопасности и защиты данных в приложениях.
