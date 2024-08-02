// Глава 16: Настройка Git и GitHub - Инициализация Git в проекте и .gitignore в Node.js

// Git - это система контроля версий, которая позволяет отслеживать изменения в коде и работать с ними в команде.
// GitHub - это платформа для размещения Git-репозиториев в интернете.
// В этой главе мы рассмотрим, как инициализировать Git в проекте и создать файл .gitignore в Node.js проекте.

// Инициализация Git в проекте:
// 1. Откройте терминал и перейдите в корневую директорию вашего проекта.
// 2. Выполните команду `git init`, чтобы инициализировать новый Git-репозиторий.
//    Это создаст скрытую папку `.git` в вашем проекте, где будут храниться все данные репозитория.

$ git init

// Теперь ваш проект отслеживается Git, и вы можете начать добавлять файлы под версионный контроль.

// Создание и настройка файла .gitignore:
// Файл .gitignore используется для указания Git, какие файлы и директории не должны отслеживаться.
// Это полезно для исключения временных файлов, файлов конфигурации и других файлов, которые не нужно включать в репозиторий.

// Создайте файл .gitignore в корневой директории вашего проекта:
$ touch .gitignore

// Откройте файл .gitignore в текстовом редакторе и добавьте следующие строки:
// В Node.js проектах часто исключают node_modules и другие временные файлы.

node_modules/
dist/
.env
*.log

// Эти строки указывают Git игнорировать директорию `node_modules`, где хранятся зависимости Node.js,
// директорию `dist`, где могут находиться скомпилированные файлы, файл `.env` с конфиденциальными переменными окружения,
// и все файлы с расширением `.log`.