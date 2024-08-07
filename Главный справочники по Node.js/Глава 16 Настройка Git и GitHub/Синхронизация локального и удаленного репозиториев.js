// Глава 16: Настройка Git и GitHub - Синхронизация локального и удаленного репозиториев в Node.js

// В этой главе мы рассмотрим, как настроить Git и GitHub для синхронизации локального и удаленного репозиториев при работе с проектами на Node.js.
// Git - это распределенная система контроля версий, которая помогает отслеживать изменения в коде и работать совместно с другими разработчиками.
// GitHub - это платформа для хостинга репозиториев Git, позволяющая хранить и управлять проектами в облаке.

// Настройка локального репозитория:
// 1. Инициализация нового Git-репозитория:
// Откройте терминал и перейдите в корневую директорию вашего проекта.
// Введите команду:
git init
// Это создаст скрытую директорию .git, где Git будет хранить все файлы и историю версий.

// 2. Добавление файлов в индекс:
// Используйте команду git add для добавления файлов в индекс (staging area).
// Пример:
git add .
// Эта команда добавит все файлы в текущей директории и ее поддиректориях в индекс.

// 3. Коммит изменений:
// После добавления файлов в индекс, создайте коммит для сохранения изменений.
// Пример:
git commit -m "Initial commit"
// Это создаст коммит с сообщением "Initial commit".

// Настройка удаленного репозитория на GitHub:
// 1. Создайте новый репозиторий на GitHub:
// Перейдите на GitHub и создайте новый репозиторий. Запомните URL-адрес вашего репозитория.

// 2. Добавление удаленного репозитория:
// Свяжите ваш локальный репозиторий с удаленным репозиторием на GitHub.
// Пример:
git remote add origin https://github.com/username/repository.git
// Замените 'username' на ваше имя пользователя GitHub и 'repository' на название вашего репозитория.

// Синхронизация локального и удаленного репозиториев:
// 1. Отправка изменений в удаленный репозиторий:
// Используйте команду git push для отправки изменений из локального репозитория в удаленный репозиторий на GitHub.
// Пример:
git push -u origin master
// Эта команда отправит изменения в ветку master удаленного репозитория.

// 2. Получение изменений из удаленного репозитория:
// Используйте команду git pull для получения изменений из удаленного репозитория в локальный репозиторий.
// Пример:
git pull origin master
// Эта команда объединит изменения из ветки master удаленного репозитория с вашим локальным репозиторием.

// Итог:
// Настройка Git и GitHub для синхронизации локального и удаленного репозиториев позволяет эффективно управлять кодом и работать совместно с другими разработчиками.
// Следуя этим шагам, вы сможете инициализировать локальный репозиторий, связывать его с удаленным репозиторием на GitHub и синхронизировать изменения между ними.
