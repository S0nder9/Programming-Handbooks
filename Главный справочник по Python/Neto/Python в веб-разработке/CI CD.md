# CI/CD для Django-приложения с GitHub Actions

Этот документ описывает настройку **CI/CD** (Continuous Integration/Continuous Deployment) для Django-приложения с использованием GitHub Actions. Включает настройку сервера, автоматизацию тестирования, линтинга и деплоя, а также устранение проблем ручного обновления приложения.

---

## Проблемы ручного деплоя

Ручной деплой (выполнение `git pull`, `pip install`, `migrate`, `systemctl restart`) неудобен, так как требует ручного вмешательства при каждом изменении. CI/CD автоматизирует этот процесс, обеспечивая:

- **Continuous Integration (CI):** Автоматическое тестирование и линтинг кода при каждом коммите.
- **Continuous Deployment (CD):** Автоматический деплой на сервер после успешного прохождения тестов.

---

## Настройка сервера (повторение шагов)

### 1–4. Подключение и создание пользователя
```bash
ssh root@192.168.0.100
sudo adduser user
sudo usermod -aG sudo user
su user
```

### 5–9. Установка необходимых пакетов
```bash
cd ~
git --version
python3 --version
sudo apt update
sudo apt install python3-venv python3-pip postgresql expect nginx
```

**Пояснение:** Пакет `expect` нужен для автоматизации ввода паролей в скриптах деплоя.

### 10–13. Настройка PostgreSQL и Nginx
```bash
sudo systemctl status postgresql
sudo su postgres
psql
```
В PostgreSQL:
```sql
ALTER USER postgres WITH PASSWORD 'postgres12';
CREATE DATABASE test_db;
\q
```
```bash
sudo systemctl start nginx
sudo systemctl status nginx
```

### 14–19. Клонирование репозитория и настройка окружения
```bash
git clone https://github.com/npatr/django_cicd.git
cd django_cicd
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
pip freeze
```

### 20. Настройка `.env`
```bash
nano .env
```
Содержимое:
```env
SECRET_KEY=123456789
DEBUG=True
ALLOWED_HOSTS=192.168.0.100
DB_ENGINE=django.db.backends.postgresql
DB_NAME=test_db
DB_USER=postgres
DB_PASSWORD=postgres12
DB_HOST=localhost
DB_PORT=5432
```

### 21–22. Миграции и запуск сервера
```bash
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### 23–26. Настройка Gunicorn
Создайте файл сервиса:
```bash
sudo nano /etc/systemd/system/gunicorn.service
```
Содержимое:
```ini
[Unit]
Description=Gunicorn service
After=network.target

[Service]
User=user
Group=www-data
WorkingDirectory=/home/user/django_cicd
ExecStart=/home/user/django_cicd/env/bin/gunicorn --workers 3 --bind unix:/home/user/django_cicd/stocks_products/project.sock stocks_products.wsgi:application

[Install]
WantedBy=multi-user.target
```

Запустите и включите Gunicorn:
```bash
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl status gunicorn
```

### 27–32. Настройка Nginx
Проверьте директорию:
```bash
ls ~/django_cicd/stocks_products/
```

Создайте конфигурацию Nginx:
```bash
sudo nano /etc/nginx/sites-available/django.conf
```
Содержимое:
```nginx
server {
    listen 80;
    server_name 192.168.0.100;

    location /static/ {
        root /home/user/django_cicd;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/user/django_cicd/stocks_products/project.sock;
    }
}
```

Создайте символическую ссылку:
```bash
sudo ln -s /etc/nginx/sites-available/django.conf /etc/nginx/sites-enabled/
```

Настройте пользователя в Nginx:
```bash
sudo nano /etc/nginx/nginx.conf
```
Измените:
```nginx
user user;
```

Перезапустите Nginx:
```bash
sudo systemctl restart nginx
sudo systemctl status nginx
```

### 33. Сбор статических файлов
```bash
python manage.py collectstatic
```

---

## Проблемы ручного деплоя

Ручное обновление требует выполнения:
```bash
ssh root@192.168.0.100
cd django_cicd
git pull
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
sudo systemctl restart gunicorn
```

Это неэффективно и подвержено ошибкам. CI/CD автоматизирует процесс.

---

## CI/CD: Процессы и ветки

### Схема взаимодействия веток (с точки зрения программиста)
В крупных проектах используется следующая структура веток в GitHub:

1. **develop**: Основная ветка разработки. Разработчики коммитят код сюда. После тестирования изменения сливаются в `stage`.
2. **stage**: Ветка для тестирования (QA). Используется для проверки кода перед продакшеном.
3. **production** (или `main`): Ветка для продакшена. Содержит стабильный код, готовый к деплою.
4. **hotfix**: Ветка для быстрых исправлений критических ошибок в продакшене. После исправления изменения сливаются в `main` и `develop`.

**Пример workflow в GitHub:**
- Создаётся PR (Pull Request) из feature-ветки в `develop`.
- После code review и прохождения тестов PR сливается в `develop`.
- Периодически `develop` сливается в `stage` для тестирования.
- После успешного тестирования `stage` сливается в `main` для деплоя.

---

## Сервисы CI/CD

### 1. Хостинг-платформы
- **GitHub Actions**: Встроенный инструмент GitHub для CI/CD.
- **GitLab Pipelines**: Аналог для GitLab.
- **Bitbucket Pipelines**: Для Bitbucket.

### 2. Серверные решения
- **CircleCI**: Облачная платформа для CI/CD.
- **Semaphore CI**: Простая настройка, подходит для небольших проектов.
- **Jenkins**: Гибкий, но требует ручной настройки на сервере.

**Рекомендация:** GitHub Actions — лучший выбор для проектов, уже использующих GitHub, из-за интеграции и простоты настройки.

---

## Настройка GitHub Actions

### 1. Создание конфигурации
Создайте директорию и файл:
```bash
mkdir -p .github/workflows
nano .github/workflows/ci-cd.yml
```

Содержимое:
```yaml
name: CI/CD

on:
  schedule:
    - cron: "0 20 * * *"  # Запуск каждый день в 20:00 UTC
  push:
    branches:
      - main

jobs:
  tests:
    runs-on: ubuntu-22.04
    env:
      SECRET_KEY: ${{ secrets.SECRET_KEY }}
      DEBUG: ${{ secrets.DEBUG_MODE }}
      ALLOWED_HOSTS: ${{ secrets.ALLOWED }}
      DB_ENGINE: ${{ secrets.DB_ENGINE }}
      DB_NAME: ${{ secrets.DB_NAME }}
      DB_USER: ${{ secrets.DB_USER }}
      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
      DB_HOST: ${{ secrets.DB_HOST }}
      DB_PORT: ${{ secrets.DB_PORT }}
    services:
      pg_main:
        image: postgres:12
        env:
          POSTGRES_DB: ${{ env.DB_NAME }}
          POSTGRES_USER: ${{ env.DB_USER }}
          POSTGRES_PASSWORD: ${{ secrets.DB_PASSWORD }}
        ports:
          - 5432:5432
        options:
          --health-cmd pg_isready
          --health-interval 5s
          --health-timeout 5s
          --health-retries 5
    steps:
      - name: Проверяем репозиторий
        uses: actions/checkout@v3

      - name: Установка Python
        uses: actions/setup-python@v3
        with:
          python-version: 3.9

      - name: Установка зависимостей
        run: pip install -r requirements.txt --upgrade pip

      - name: Линтинг
        run: flake8 logistic/ --exclude=logistic/migrations/

      - name: Тестирование
        run: python manage.py test
        env:
          SECRET_KEY: ${{ env.SECRET_KEY }}
          DEBUG: ${{ env.DEBUG }}
          ALLOWED_HOSTS: ${{ env.ALLOWED_HOSTS }}
          DB_ENGINE: ${{ env.DB_ENGINE }}
          DB_NAME: ${{ env.DB_NAME }}
          DB_USER: ${{ env.DB_USER }}
          DB_PASSWORD: ${{ env.DB_PASSWORD }}
          DB_HOST: ${{ env.DB_HOST }}
          DB_PORT: ${{ env.DB_PORT }}

      - name: Деплой
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          password: ${{ secrets.SSH_PASSWORD }}
          script: expect /home/user/django_cicd/deploy.exp
```

### 2. Настройка секретов
В репозитории GitHub:
- Перейдите в **Settings > Secrets and variables > Actions**.
- Добавьте секреты:
  - `SECRET_KEY`, `DEBUG_MODE`, `ALLOWED`, `DB_ENGINE`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`.
  - `SSH_HOST`, `SSH_USER`, `SSH_PASSWORD` (для деплоя).

**Пояснение:**
- `on: push: branches: - main` запускает pipeline при пуше в ветку `main`.
- `schedule: - cron: "0 20 * * *"` запускает pipeline ежедневно в 20:00 UTC.
- `flake8` проверяет стиль кода.
- `appleboy/ssh-action` выполняет деплой через SSH.

---

## Настройка CD (Continuous Deployment)

### 41–46. Ручной деплой (для сравнения)
```bash
cd django_cicd/
git pull main
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
sudo systemctl restart gunicorn
```

### 47–53. Автоматизация деплоя
Создайте скрипт `deploy.sh`:
```bash
nano deploy.sh
```
Содержимое:
```bash
#!/bin/bash
cd /home/user/django_cicd
git pull main
. env/bin/activate
pip install -r requirements.txt
python manage.py migrate
sudo systemctl restart gunicorn
```

Создайте скрипт `deploy.exp` для автоматизации ввода пароля:
```bash
nano deploy.exp
```
Содержимое:
```bash
#!/usr/bin/expect
spawn /home/user/django_cicd/deploy.sh
expect "password"
send -- "1\r"  # Замените 1 на ваш пароль
expect eof
```

Установите права:
```bash
sudo chmod +x deploy.sh
sudo chmod +x deploy.exp
```

Протестируйте:
```bash
expect /home/user/django_cicd/deploy.exp
```

---

## Рекомендации по CI/CD

1. **Ветки и workflow:**
   - Используйте `feature/*` ветки для новых функций, сливайте в `develop` через PR.
   - Тестируйте в `stage` перед слиянием в `main`.
   - Для hotfix создавайте ветки `hotfix/*` и сливайте в `main` и `develop`.

2. **GitHub Actions:**
   - Добавьте линтинг других инструментов (например, `pylint`, `black`).
   - Настройте уведомления о сбоях pipeline в Slack/Telegram.
   - Используйте матрицы для тестирования на разных версиях Python:
     ```yaml
     strategy:
       matrix:
         python-version: [3.8, 3.9, 3.10]
     ```

3. **Безопасность:**
   - Храните пароли и ключи в GitHub Secrets.
   - Используйте SSH-ключи вместо паролей для `appleboy/ssh-action`:
     ```yaml
     key: ${{ secrets.SSH_KEY }}
     ```

4. **Оптимизация:**
   - Кэшируйте зависимости в GitHub Actions:
     ```yaml
     - name: Cache dependencies
       uses: actions/cache@v3
       with:
         path: ~/.cache/pip
         key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}
     ```
   - Проверяйте логи Gunicorn:
     ```bash
     sudo journalctl -u gunicorn
     ```

5. **Тестирование:**
   - Добавьте тесты для всех эндпоинтов (см. предыдущие разделы).
   - Используйте `pytest` с `pytest-cov` для анализа покрытия.

6. **Облачные альтернативы:**
   - Рассмотрите Heroku, AWS Elastic Beanstalk или Google Cloud App Engine для упрощения деплоя.
   - Пример для Heroku:
     ```bash
     heroku git:remote -a your-app-name
     git push heroku main
     ```

---

## Полезные ресурсы
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Appleboy SSH Action](https://github.com/appleboy/ssh-action)
- [Pytest-Django](https://pytest-django.readthedocs.io/)