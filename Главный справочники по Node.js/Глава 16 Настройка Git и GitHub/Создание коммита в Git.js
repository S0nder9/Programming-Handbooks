// Глава 16: Настройка Git и GitHub - Создание коммита в Git в Node.js

// В этой главе мы рассмотрим, как создавать коммиты в Git с использованием Node.js.
// Это может быть полезно для автоматизации процесса коммитов в проектах или для создания собственных инструментов для работы с Git.

// Подготовка:
// 1. Убедитесь, что Git установлен на вашем компьютере.
// 2. Инициализируйте Git репозиторий в вашем проекте, если это еще не сделано: `git init`.

// Для работы с Git в Node.js мы будем использовать библиотеку `simple-git`.
// Установите эту библиотеку через npm:
const { exec } = require('child_process');

// Установка simple-git:
exec('npm install simple-git', (error, stdout, stderr) => {
  if (error) {
    console.error(`Ошибка при установке simple-git: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

// Использование библиотеки simple-git:
const simpleGit = require('simple-git');

// Создадим функцию для создания коммита:
async function createCommit(commitMessage) {
  const git = simpleGit();

  try {
    // Добавляем все изменения в индекс:
    await git.add('.');
    console.log('Изменения добавлены в индекс');

    // Создаем коммит с переданным сообщением:
    await git.commit(commitMessage);
    console.log('Коммит создан:', commitMessage);
  } catch (error) {
    console.error('Ошибка при создании коммита:', error);
  }
}

// Используем функцию для создания коммита:
createCommit('Initial commit');

// Итог:
// В этом примере мы установили библиотеку `simple-git`, использовали ее для добавления изменений в индекс и создания коммита.
// Это позволяет автоматизировать процесс создания коммитов в Git с использованием Node.js.
