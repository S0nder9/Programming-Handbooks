# Глава 44: Отправка email - Отправка вложений в email

# Отправка email с вложениями - это важный аспект программирования на Python, когда нужно передать не только текстовое сообщение, но и файлы (например, изображения, документы и т.д.).
# Для этого мы используем модули smtplib и email, которые позволяют отправлять письма с файлами через SMTP-сервер.

# Основные шаги для отправки email с вложениями:
# 1. Подключение к SMTP-серверу.
# 2. Создание сообщения, которое включает текст и вложение.
# 3. Отправка сообщения с вложением через SMTP-сервер.

# Модуль smtplib используется для отправки email через SMTP-протокол.
# Модуль email используется для создания сообщений, форматирования тела письма, а также для прикрепления файлов к письму.

# Как это реализовать?
# 1. Мы подключаемся к SMTP-серверу (например, Gmail).
# 2. Создаем MIME-сообщение с помощью классов из модуля email.
# 3. Используем MIME-мultipart для добавления текстовой части и вложений.
# 4. Прикрепляем файл к email и отправляем сообщение через сервер.

# Пример отправки email с вложением:

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

# Функция для отправки email с вложением
def send_email_with_attachment(sender_email, receiver_email, subject, body, attachment_path, smtp_server, smtp_port, login, password):
    # Создаем объект MIMEMultipart для email-сообщения
    msg = MIMEMultipart()

    # Добавляем информацию об отправителе, получателе и теме
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # Добавляем текст сообщения
    msg.attach(MIMEText(body, 'plain'))

    # Открываем файл для отправки
    filename = os.path.basename(attachment_path)
    attachment = open(attachment_path, "rb")

    # Создаем объект MIMEBase и добавляем заголовки
    mime_base = MIMEBase('application', 'octet-stream')
    mime_base.set_payload(attachment.read())

    # Кодируем файл в Base64
    encoders.encode_base64(mime_base)

    # Добавляем заголовок для вложения
    mime_base.add_header('Content-Disposition', f'attachment; filename={filename}')

    # Прикрепляем файл к сообщению
    msg.attach(mime_base)

    # Закрываем файл
    attachment.close()

    # Подключаемся к SMTP-серверу и отправляем сообщение
    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()  # Шифрование соединения
        server.login(login, password)  # Вход в учетную запись
        text = msg.as_string()  # Преобразуем сообщение в строку
        server.sendmail(sender_email, receiver_email, text)  # Отправляем письмо

# Параметры для отправки письма
sender_email = "your_email@gmail.com"
receiver_email = "recipient_email@gmail.com"
subject = "Тема письма с вложением"
body = "Это письмо содержит вложение."
attachment_path = "path/to/your/file.txt"
smtp_server = "smtp.gmail.com"
smtp_port = 587
login = "your_email@gmail.com"
password = "your_password"

# Вызов функции для отправки email
send_email_with_attachment(sender_email, receiver_email, subject, body, attachment_path, smtp_server, smtp_port, login, password)

# Итог
# Отправка email с вложениями - это важный и удобный способ передачи файлов через почту. 
# В Python для этого используются модули smtplib и email. Код требует подключения к SMTP-серверу и правильного форматирования сообщения с использованием MIME-классов.
# Пример выше демонстрирует, как отправить текстовое сообщение вместе с вложенным файлом, используя Python.
