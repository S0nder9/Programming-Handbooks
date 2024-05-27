// Глава 1: Введение в localStorage
// localStorage — это механизм веб-хранилища, который позволяет сохранять данные в браузере пользователя
// в формате ключ-значение. Данные, хранящиеся в localStorage, сохраняются между сессиями браузера
// и остаются доступными даже после закрытия и повторного открытия браузера.


// Глава 2: Основные методы localStorage
// localStorage предоставляет несколько методов для работы с данными: setItem(), getItem(), removeItem(), clear(), и key().

// Подглава 2.1: Метод setItem()
// Метод setItem() используется для сохранения данных в localStorage. Он принимает два аргумента:
// ключ (key) и значение (value).

// Пример:
localStorage.setItem('username', 'JohnDoe');
// В данном примере мы сохраняем значение 'JohnDoe' под ключом 'username'.

// Подглава 2.2: Метод getItem()
// Метод getItem() используется для получения данных из localStorage. Он принимает один аргумент: ключ (key).

// Пример:
const username = localStorage.getItem('username');
console.log(username); // Выведет 'JohnDoe'
// В данном примере мы получаем значение, сохраненное под ключом 'username'.

// Подглава 2.3: Метод removeItem()
// Метод removeItem() используется для удаления данных из localStorage. Он принимает один аргумент: ключ (key).

// Пример:
localStorage.removeItem('username');
// В данном примере мы удаляем значение, сохраненное под ключом 'username'.

// Подглава 2.4: Метод clear()
// Метод clear() используется для удаления всех данных из localStorage.

// Пример:
localStorage.clear();
// В данном примере мы очищаем все данные, хранящиеся в localStorage.

// Подглава 2.5: Метод key()
// Метод key() используется для получения ключа по его индексу в localStorage. Он принимает один аргумент: индекс (index).

// Пример:
const firstKey = localStorage.key(0);
console.log(firstKey); // Выведет первый ключ в localStorage
// В данном примере мы получаем первый ключ, хранящийся в localStorage.


// Глава 3: Работа с объектами в localStorage
// localStorage позволяет хранить только строки. Для сохранения объектов нужно использовать методы JSON.stringify() и JSON.parse().

// Подглава 3.1: Сохранение объекта в localStorage
// Пример:
const user = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com'
};
localStorage.setItem('user', JSON.stringify(user));
// В данном примере мы конвертируем объект user в строку и сохраняем его в localStorage под ключом 'user'.

// Подглава 3.2: Получение объекта из localStorage
// Пример:
const userData = JSON.parse(localStorage.getItem('user'));
console.log(userData);
// В данном примере мы получаем строку из localStorage, конвертируем ее обратно в объект и выводим его в консоль.


// Глава 4: Примеры использования localStorage в React

// Подглава 4.1: Сохранение состояния компонента в localStorage
// В этом примере мы создадим React компонент, который сохраняет состояние (текст) в localStorage.

import React, { useState, useEffect } from 'react';

function TextInput() {
  const [text, setText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('text');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('text', text);
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>Вы ввели: {text}</p>
    </div>
  );
}

export default TextInput;

// В этом примере:
// 1. Компонент TextInput использует useState для управления состоянием текста.
// 2. Первый useEffect загружает сохраненный текст из localStorage при монтировании компонента.
// 3. Второй useEffect сохраняет текст в localStorage каждый раз, когда состояние текста изменяется.
// 4. Функция handleChange обновляет состояние текста при изменении ввода.


// Глава 5: Ограничения и рекомендации

// Подглава 5.1: Ограничения localStorage
// - Размер хранилища ограничен: обычно около 5-10 МБ на домен.
// - Хранение только строк: для хранения объектов необходимо использовать JSON.stringify() и JSON.parse().
// - Синхронные операции: могут вызвать задержки при работе с большим количеством данных.

// Подглава 5.2: Рекомендации по использованию localStorage
// - Используйте localStorage для хранения данных, которые не требуют защиты (например, пользовательские настройки).
// - Избегайте хранения чувствительных данных (пароли, токены и т.д.).
// - Очистите неактуальные данные из localStorage, чтобы не переполнить хранилище.

// Глава 6: Заключение
// localStorage является мощным инструментом для хранения данных на стороне клиента. Он прост в использовании и позволяет сохранять данные между сессиями. Тем не менее, важно учитывать его ограничения и использовать его с осторожностью для обеспечения безопасности и производительности приложения.
