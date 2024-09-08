# Глава 44: Отправка email

# Отправка email с помощью модуля smtplib
# В Python есть встроенный модуль smtplib, который позволяет отправлять email-сообщения через протокол SMTP (Simple Mail Transfer Protocol).
# Этот модуль дает возможность вашей программе отправлять электронные письма, что может быть полезно для уведомлений, отчетов или автоматизации.

# Зачем используется модуль smtplib?
# Модуль smtplib используется для программного отправления email через SMTP-сервер. Это позволяет автоматизировать процесс отправки писем,
# например, отправлять отчеты о работе программы, уведомления пользователям или рассылать автоматические ответы.

# Как работает smtplib?
# Для отправки email с помощью smtplib, вам нужно подключиться к SMTP-серверу, который используется для отправки почты.
# Например, для Gmail SMTP сервер будет smtp.gmail.com. После подключения вы можете отправить сообщение, используя стандартные команды SMTP.

# Основные шаги для отправки email:
# 1. Импортировать модуль smtplib
# 2. Создать SMTP объект
# 3. Авторизоваться на сервере, если это требуется
# 4. Отправить сообщение
# 5. Закрыть соединение

# Несколько примеров

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Пример отправки простого текста
def send_simple_email():
    sender_email = "your_email@gmail.com"
    receiver_email = "receiver_email@example.com"
    password = "your_password"

    # Создаем объект SMTP для подключения к серверу Gmail
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()  # Инициализация защищенного соединения
        server.login(sender_email, password)  # Логин к серверу

        # Отправка простого сообщения
        message = "Привет! Это тестовое сообщение."
        server.sendmail(sender_email, receiver_email, message)
        print("Письмо отправлено!")

# Пример отправки более сложного email с темой и телом
def send_complex_email():
    sender_email = "your_email@gmail.com"
    receiver_email = "receiver_email@example.com"
    password = "your_password"

    # Создаем объект MIMEMultipart для структуры письма
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = "Тема письма"

    # Добавляем текст в тело письма
    body = "Это сообщение содержит тему и тело текста!"
    msg.attach(MIMEText(body, 'plain'))

    # Отправляем письмо через SMTP-сервер
    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        print("Письмо с темой отправлено!")

# Итог
# Модуль smtplib позволяет легко отправлять email-сообщения через SMTP.
# Это актуальный инструмент для создания автоматизированных уведомлений и отчетов, отправки сообщений пользователям и других задач, связанных с email.
# При отправке писем также можно использовать модули для работы с вложениями, HTML-контентом и других расширенных форматов писем.

if __name__ == "__main__":
    send_simple_email()
    send_complex_email()
