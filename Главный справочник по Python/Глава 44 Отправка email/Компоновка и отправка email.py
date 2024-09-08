# Глава 44: Отправка email - Компоновка и отправка email

# В Python есть встроенный модуль smtplib, который позволяет отправлять электронные письма с помощью протокола SMTP (Simple Mail Transfer Protocol).
# Этот модуль обеспечивает все необходимые инструменты для соединения с SMTP-сервером и отправки электронных писем из вашего Python-приложения.

# Компоновка и отправка email
# Чтобы отправить email с помощью Python, нужно сделать несколько шагов:
# 1. Подключиться к SMTP-серверу.
# 2. Создать само письмо, которое будет отправлено.
# 3. Отправить письмо через установленное соединение.

# Помимо smtplib, для создания письма в правильном формате (с темой, телом письма, вложениями и т.д.) часто используется модуль email.
# Он позволяет удобно компилировать письма в формат MIME (Multipurpose Internet Mail Extensions).

# Зачем используется отправка email?
# Отправка email используется в автоматизированных системах для уведомлений, подтверждений, рассылок и других задач.
# Вы можете автоматически отправлять сообщения пользователям о событиях или обновлениях, генерировать отчеты или запрашивать информацию.

# Как это работает?

# Основные шаги:
# 1. Импортировать необходимые библиотеки.
# 2. Установить соединение с SMTP-сервером (например, Gmail, Outlook и т.д.).
# 3. Создать сообщение с использованием классов из модуля email.
# 4. Использовать SMTP для отправки письма.

# Пример отправки email через SMTP-сервер Gmail

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Настройки SMTP-сервера (в данном примере используется Gmail)
smtp_server = "smtp.gmail.com"
smtp_port = 587
username = "your_email@gmail.com"  # Ваш email
password = "your_password"  # Ваш пароль (либо специальный пароль приложений)

# Функция для отправки email
def send_email(to_address, subject, message):
    try:
        # Устанавливаем соединение с SMTP-сервером
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Начинаем защищенное соединение
        server.login(username, password)  # Авторизуемся

        # Создаем объект сообщения
        email_message = MIMEMultipart()
        email_message['From'] = username
        email_message['To'] = to_address
        email_message['Subject'] = subject

        # Прикрепляем текст письма к сообщению
        email_message.attach(MIMEText(message, 'plain'))

        # Отправляем письмо
        server.sendmail(username, to_address, email_message.as_string())

        print("Письмо успешно отправлено!")
    except Exception as e:
        print(f"Ошибка при отправке письма: {e}")
    finally:
        server.quit()  # Закрываем соединение

# Вызов функции отправки email
recipient = "recipient_email@gmail.com"
subject = "Тестовое письмо"
message = "Привет! Это тестовое письмо, отправленное из Python."

send_email(recipient, subject, message)

# Как это работает:
# 1. Подключаемся к SMTP-серверу через smtplib.SMTP().
# 2. Используем server.starttls() для установки защищенного соединения.
# 3. Авторизуемся с помощью server.login().
# 4. Создаем сообщение с помощью MIMEMultipart(), заполняем поля From, To и Subject, и добавляем тело письма через MIMEText().
# 5. Отправляем письмо через server.sendmail().

# Итог
# Отправка email через Python является полезным инструментом для автоматизации процессов, связанных с уведомлениями и взаимодействием с пользователями.
# Благодаря встроенным библиотекам smtplib и email можно легко создавать и отправлять письма на различные почтовые серверы, обеспечивая необходимый функционал в ваших приложениях.
