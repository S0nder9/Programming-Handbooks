// Глава 1: Введение в MongoDB - Агрегационное промежуточное программное обеспечение

// MongoDB предоставляет мощный инструмент для работы с данными — агрегирование. 
// Агрегация позволяет выполнять различные операции, такие как фильтрация, группировка, сортировка и преобразование данных.
// Для улучшения производительности или изменения поведения запросов к базе данных, в Mongoose можно использовать промежуточное программное обеспечение (middleware).

// Пример промежуточного программного обеспечения (middleware) для агрегирования:

// В данном примере мы используем Mongoose для работы с MongoDB и добавляем промежуточное ПО для схемы `tourSchema`.
// Этот middleware срабатывает перед выполнением агрегатных запросов и изменяет конвейер операций (pipeline).

tourSchema.pre("aggregate", function (next) {
    // Выводим текущий конвейер операций в консоль
    console.log(this.pipeline());
  
    // Добавляем этап $match в начало конвейера, чтобы исключить туры, у которых поле "secretTour" установлено в true
    this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  
    // Переходим к следующему этапу
    next();
  });
  
  // Объяснение:
  
  // 1. Конвейер агрегирования (pipeline) — это массив операций, которые выполняются последовательно на коллекции данных.
  // В каждом этапе конвейера можно выполнять разные операции: фильтрацию, группировку, сортировку, преобразование и т.д.
  
  // 2. В данном примере `pre("aggregate")` — это промежуточное ПО, которое выполняется перед агрегатным запросом. 
  // Мы получаем текущий конвейер операций с помощью `this.pipeline()` и добавляем новый этап `$match` в начало конвейера с помощью `unshift()`.
  
  // 3. Этап `$match: { secretTour: { $ne: true } }` используется для фильтрации документов.
  // Он исключает все документы, у которых поле `secretTour` установлено в значение `true`.
  // Таким образом, при каждом выполнении агрегатного запроса секретные туры не будут включены в результат.
  
  // Пример использования схемы:
  
  const mongoose = require('mongoose');
  
  // Определение схемы тура
  const tourSchema = new mongoose.Schema({
    name: String,
    price: Number,
    secretTour: {
      type: Boolean,
      default: false
    }
  });
  
  // Модель тура на основе схемы
  const Tour = mongoose.model('Tour', tourSchema);
  
  // Пример агрегатного запроса, который будет фильтровать секретные туры:
  Tour.aggregate([
    { $group: { _id: "$price", count: { $sum: 1 } } }
  ]).then(result => {
    console.log(result);
  });
  
  // Результат запроса:
  // Секретные туры не будут включены в агрегатный результат благодаря промежуточному ПО.
  
  // Итог:
  // Использование промежуточного ПО (middleware) в Mongoose для агрегатных запросов позволяет изменять конвейер операций перед их выполнением.
  // Это особенно полезно, когда необходимо автоматически применять фильтрацию или модификацию данных перед выполнением сложных операций.
  