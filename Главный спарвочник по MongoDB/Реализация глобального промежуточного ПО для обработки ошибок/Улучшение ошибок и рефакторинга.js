// Глава 1: Введение в MongoDB - Улучшение ошибок и рефакторинг

// В этой главе мы рассмотрим, как улучшить обработку ошибок и рефакторинг приложения при работе с MongoDB на сервере Node.js.
// Ошибки являются неизбежной частью работы с базой данных, и важно правильно их обрабатывать, чтобы обеспечить стабильность и информативность приложения.

// Пример использования обработчика ошибок и класса AppError для централизованного управления ошибками:

// 1. Определение класса AppError
// Класс AppError наследуется от встроенного класса Error и используется для создания настраиваемых ошибок.
// Он добавляет дополнительную информацию, такую как статус ошибки и флаг, указывающий на операционную ошибку (isOperation).
class AppError extends Error {
    constructor(message, statusCode) {
      super(message); // Вызов конструктора родительского класса Error
  
      this.statusCode = statusCode; // Установка кода статуса
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Определение статуса ошибки
      this.isOperation = true; // Флаг, указывающий на операционную ошибку
  
      Error.captureStackTrace(this, this.constructor); // Захват трассировки стека
    }
  }
  
  module.exports = AppError;
  
  // 2. Глобальная обработка ошибок
  // Middleware для обработки ошибок используется для обработки любых ошибок, возникающих в приложении.
  // Оно работает с любыми маршрутами и запросами, а также интегрируется с AppError для детализированного вывода ошибок.
  app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); 
  });
  
  // В данном случае мы используем app.all() для обработки всех HTTP-запросов, которые не совпадают с любым из существующих маршрутов.
  // Мы вызываем next() с новым объектом AppError, чтобы передать ошибку в следующее middleware, отвечающее за глобальную обработку ошибок.
  
  // 3. Глобальный обработчик ошибок
  // Функция globalErrorHandler - это централизованный обработчик всех ошибок, возникающих в приложении.
  const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    // Отправляем ответ с информацией об ошибке
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };
  
  // Пример подключения обработчика ошибок в Express-приложении:
  app.use(globalErrorHandler);
  
  // Этот обработчик принимает любой объект ошибки, переданный через next(), и формирует ответ для клиента.
  // Если ошибка связана с MongoDB (например, ошибка валидации или ошибка дублирования данных), мы можем добавить специальные обработчики для улучшенной обработки таких ошибок.
  
  // 4. Рефакторинг и расширение функционала
  // Для улучшения и рефакторинга обработки ошибок, вы можете добавить больше проверок и условий в globalErrorHandler.
  // Пример: добавление обработки ошибок MongoDB, таких как ошибки валидации.
  
  const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data: ${errors.join(". ")}`;
    return new AppError(message, 400);
  };
  
  const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  
    // Проверяем тип ошибки MongoDB и создаем новый объект ошибки с использованием AppError
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };
  
  // Итог:
  // Для обеспечения стабильной работы приложения важно централизовать обработку ошибок и создать универсальные классы, такие как AppError, для управления ошибками.
  // Важно использовать различные подходы к обработке специфичных ошибок MongoDB, таких как ошибки валидации, для улучшения пользовательского опыта и удобства отладки.
  