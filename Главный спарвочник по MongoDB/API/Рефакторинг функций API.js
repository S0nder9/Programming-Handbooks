// Глава 1: Введение в MongoDB - Рефакторинг функций API

// В этом разделе мы разберем класс `APIFeatures`, который используется для работы с запросами к базе данных MongoDB.
// Этот класс предоставляет удобные методы для фильтрации, сортировки, ограничения полей и пагинации данных.
// Мы рассмотрим каждую из этих функций и объясним, как они работают в контексте MongoDB.

class APIFeatures {
    constructor(query, queryString) {
      // query - это запрос, который мы отправляем к MongoDB (например, Model.find()).
      // queryString - это параметры запроса из URL (например, req.query).
      this.query = query;
      this.queryString = queryString;
    }
  
    // 1. Фильтрация
    // Функция `filter()` отвечает за фильтрацию данных на основе переданных параметров.
    filter() {
      // Копируем queryString в новый объект queryObj.
      const queryObj = { ...this.queryString };
      // Исключаем специальные параметры, которые не относятся к фильтрации (page, sort, limit, fields).
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      // Преобразуем операторы сравнения (gte, gt, lte, lt) в формат, поддерживаемый MongoDB.
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      // Применяем фильтр к запросу.
      this.query = this.query.find(JSON.parse(queryStr));
  
      // Возвращаем `this`, чтобы обеспечить возможность чейнинга методов.
      return this;
    }
  
    // 2. Сортировка
    // Функция `sort()` используется для сортировки данных по указанным полям.
    sort() {
      // Проверяем, передан ли параметр sort в queryString.
      if (this.queryString.sort) {
        // Если передан, преобразуем его в формат, который принимает MongoDB (разделяем запятые на пробелы).
        const sortBy = this.queryString.sort.split(",").join(" ");
        // Применяем сортировку к запросу.
        this.query = this.query.sort(sortBy);
      } else {
        // Если параметр sort не передан, сортируем по умолчанию по полю `createdAt` в порядке убывания.
        this.query = this.query.sort("-createdAt");
      }
  
      return this;
    }
  
    // 3. Ограничение полей
    // Функция `limitFields()` используется для возврата только указанных полей в запросе.
    limitFields() {
      // Проверяем, передан ли параметр fields в queryString.
      if (this.queryString.fields) {
        // Если передан, преобразуем его в формат, который принимает MongoDB (разделяем запятые на пробелы).
        const fields = this.queryString.fields.split(",").join(" ");
        // Применяем выбор полей к запросу.
        this.query = this.query.select(fields);
      } else {
        // Если параметр fields не передан, исключаем поле `__v`, которое обычно используется для версий документов.
        this.query = this.query.select("-__v");
      }
  
      return this;
    }
  
    // 4. Пагинация
    // Функция `paginate()` используется для реализации постраничного вывода данных.
    paginate() {
      // Получаем номер страницы и лимит записей на странице из queryString или устанавливаем значения по умолчанию.
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      // Вычисляем количество записей, которые нужно пропустить для нужной страницы.
      const skip = (page - 1) * limit;
  
      // Применяем пропуск и ограничение к запросу.
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }
  
  // Экспортируем класс APIFeatures для использования в других частях приложения.
  module.exports = APIFeatures;
  
  /*
  Итог:
  Класс APIFeatures является полезным инструментом для обработки запросов к базе данных MongoDB в API-приложениях.
  Он предоставляет методы для фильтрации, сортировки, ограничения полей и пагинации данных, что позволяет гибко настраивать запросы
  и улучшать взаимодействие с базой данных.
  Каждая функция возвращает `this`, что позволяет цепочечный вызов методов, улучшая читаемость и удобство работы с классом.
  */
  