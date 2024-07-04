// Глава 2: Краткий курс по JavaScript

// Промисы и async/await

// Промисы и async/await являются основными инструментами для работы с асинхронным кодом в JavaScript.
// В этой главе мы рассмотрим, как создавать и использовать промисы, а также как работать с асинхронным кодом с помощью ключевых слов async и await.

// Промисы (Promises)
// Промисы позволяют нам работать с асинхронными операциями, такими как запросы на сервер или операции с файлами.
// Промис представляет собой объект, который может быть в одном из трех состояний:
// 1. Pending (Ожидание) — начальное состояние, когда промис еще не выполнен и не отклонен.
// 2. Fulfilled (Выполнен) — промис успешно завершился, и результат доступен.
// 3. Rejected (Отклонен) — произошла ошибка, и промис не был выполнен.

// Создание промиса
const myPromise = new Promise((resolve, reject) => {
  // Этим блоком кода мы определяем асинхронную операцию
  setTimeout(() => {
    // Здесь мы эмулируем асинхронную операцию с таймером
    const success = true; // Здесь можно изменить на false, чтобы увидеть обработку ошибки

    if (success) {
      resolve('Операция выполнена успешно!'); // Если операция успешна, вызываем resolve
    } else {
      reject(new Error('Произошла ошибка при выполнении операции')); // Если произошла ошибка, вызываем reject
    }
  }, 2000); // Установим таймаут в 2 секунды
});

// Использование промиса
myPromise
  .then(result => {
    console.log(result); // Если промис выполнен успешно, выводим результат
  })
  .catch(error => {
    console.error(error); // Если промис отклонен, выводим ошибку
  })
  .finally(() => {
    console.log('Операция завершена'); // Этот блок выполняется независимо от того, выполнен ли промис успешно или нет
  });

// async/await
// async/await — это синтаксический сахар для работы с промисами, который делает асинхронный код более читаемым и понятным.

// Функция, возвращающая промис
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Здесь можно изменить на false, чтобы увидеть обработку ошибки

      if (success) {
        resolve('Данные успешно получены!'); // Если операция успешна, вызываем resolve
      } else {
        reject(new Error('Ошибка получения данных')); // Если произошла ошибка, вызываем reject
      }
    }, 2000); // Установим таймаут в 2 секунды
  });
};

// Асинхронная функция, использующая async/await
const fetchDataAsync = async () => {
  try {
    const result = await fetchData(); // Ожидаем завершения промиса
    console.log(result); // Выводим результат успешного выполнения промиса
  } catch (error) {
    console.error(error); // Обрабатываем ошибки, если промис отклонен
  } finally {
    console.log('Операция завершена'); // Этот блок выполняется независимо от того, выполнен ли промис успешно или нет
  }
};

// Вызов асинхронной функции
fetchDataAsync();

// Пример использования промисов с несколькими запросами
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Данные пользователя получены');
    }, 1000);
  });
};

const fetchPostsData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Данные постов получены');
    }, 2000);
  });
};

// Промисы в цепочке
fetchUserData()
  .then(userData => {
    console.log(userData);
    return fetchPostsData(); // Возвращаем новый промис для следующего then
  })
  .then(postsData => {
    console.log(postsData);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  })
  .finally(() => {
    console.log('Все запросы завершены');
  });

// Пример параллельного выполнения промисов с помощью Promise.all
const fetchAllData = async () => {
  try {
    const [userData, postsData] = await Promise.all([fetchUserData(), fetchPostsData()]);
    console.log(userData);
    console.log(postsData);
  } catch (error) {
    console.error('Ошибка при выполнении запросов:', error);
  } finally {
    console.log('Параллельные запросы завершены');
  }
};

// Вызов функции для параллельного выполнения запросов
fetchAllData();

// Пример использования промисов с Promise.race
const fetchDataWithRace = async () => {
  try {
    const result = await Promise.race([fetchUserData(), fetchPostsData()]);
    console.log('Промис, который выполнился первым:', result);
  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    console.log('Promise.race завершен');
  }
};

// Вызов функции для параллельного выполнения запросов с Promise.race
fetchDataWithRace();

// Итог:
// Промисы и async/await являются основными инструментами для работы с асинхронными операциями в JavaScript. Промисы позволяют управлять состоянием асинхронных операций, а async/await делает код более читаемым и упрощает обработку ошибок.
// Использование этих инструментов поможет вам эффективно работать с асинхронным кодом и обрабатывать результаты запросов и ошибок.
