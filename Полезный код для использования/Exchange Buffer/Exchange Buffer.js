// Буфер обмена — это временное хранилище, которое используется для копирования и вставки данных.
// На сайте мы можем использовать буфер обмена для копирования текста, что улучшает удобство для пользователя.

// Глава 2: Основные методы работы с буфером обмена
// В JavaScript для работы с буфером обмена используется API Clipboard. 
// Основные методы для копирования данных: writeText() и readText().

// Подглава 2.1: Метод writeText()
// Метод writeText() используется для копирования текста в буфер обмена. Он принимает один аргумент: текст, который нужно скопировать.

// Пример использования writeText для копирования текста по нажатию на кнопку:

document.getElementById('copyButton').addEventListener('click', function() {
    const textToCopy = document.getElementById('textToCopy').innerText;
    
    navigator.clipboard.writeText(textToCopy).then(function() {
        console.log('Текст успешно скопирован в буфер обмена.');
        // Вы можете также показать пользователю уведомление об успешном копировании
    }).catch(function(error) {
        console.error('Ошибка при копировании текста: ', error);
        // Вы можете также показать пользователю уведомление об ошибке
    });
});

// Пример HTML для кнопки и текста:
// <div id="textToCopy">Этот текст будет скопирован в буфер обмена.</div>
// <button id="copyButton">Скопировать текст</button>

// Подглава 2.2: Метод readText()
// Метод readText() используется для чтения текста из буфера обмена. Он возвращает промис, который разрешается строкой текста.

navigator.clipboard.readText()
  .then(text => {
    console.log('Текст из буфера обмена: ', text);
  })
  .catch(err => {
    console.error('Не удалось прочитать текст из буфера обмена: ', err);
  });

// Глава 3: Реализация копирования текста в React
// В React вы можете использовать API Clipboard для копирования текста, создавая соответствующие функции и привязывая их к событиям.

import React, { useState } from 'react';

const ClipboardExample = () => {
  const [text, setText] = useState('Пример текста для копирования');

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Текст успешно скопирован в буфер обмена.');
      })
      .catch(err => {
        console.error('Не удалось скопировать текст: ', err);
      });
  };

  return (
    <div>
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)} 
      />
      <button onClick={handleCopy}>Копировать текст</button>
    </div>
  );
};

export default ClipboardExample;
