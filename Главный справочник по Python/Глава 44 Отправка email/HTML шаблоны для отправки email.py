# Глава 44: Отправка email - HTML шаблоны для отправки email

# Введение
# При отправке email через Python часто требуется не только отправить простой текст, 
# но и добавить форматирование, изображения или ссылки. Для этого используются HTML шаблоны.
# HTML позволяет форматировать электронные письма, делая их более привлекательными и функциональными.

# Зачем нужны HTML шаблоны для email?
# Использование HTML для отправки email позволяет:
# 1. Добавлять стили к тексту (жирный шрифт, курсив, цвет и т.д.)
# 2. Встраивать изображения или ссылки
# 3. Делать структуру письма более профессиональной и удобной для восприятия.

# Где используются HTML шаблоны?
# HTML шаблоны используются в маркетинговых рассылках, уведомлениях, подтверждениях регистрации и т.д.
# Это помогает передать больше информации и сделать письмо более привлекательным для получателя.

# Как использовать HTML шаблоны для отправки email в Python?
# Для отправки HTML письма через Python используется модуль smtplib для подключения к почтовому серверу
# и модуль email для создания и форматирования email-сообщений.

# Основные шаги:
# 1. Импортируйте нужные модули (smtplib, email).
# 2. Создайте HTML шаблон для вашего email.
# 3. Используйте MIMEText для указания, что ваше сообщение будет в формате HTML.
# 4. Подключитесь к SMTP серверу и отправьте письмо.

# Пример HTML шаблона:
html_template = """
<html>
  <body>
    <h1 style="color:blue;">Привет, {name}!</h1>
    <p>Спасибо за регистрацию на нашем сайте. Ниже приведены ваши данные:</p>
    <ul>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Имя пользователя:</strong> {username}</li>
    </ul>
    <p>Для подтверждения учетной записи, перейдите по следующей ссылке:</p>
    <a href="{confirmation_link}">Подтвердить учетную запись</a>
  </body>
</html>
"""

# Где {name}, {email}, {username}, {confirmation_link} - это динамические данные, которые вы можете подставить в шаблон перед отправкой письма.

# Пример отправки email с HTML шаблоном:
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Данные для отправки
sender_email = "your_email@example.com"
receiver_email = "receiver_email@example.com"
password = "your_password"

# Создаем объект MIMEMultipart для email
message = MIMEMultipart("alternative")
message["Subject"] = "Подтверждение регистрации"
message["From"] = sender_email
message["To"] = receiver_email

# Подставляем данные в HTML шаблон
html_content = html_template.format(
    name="Иван",
    email=receiver_email,
    username="ivan123",
    confirmation_link="https://example.com/confirm"
)

# Преобразуем HTML в объект MIMEText
html_part = MIMEText(html_content, "html")

# Добавляем HTML часть в сообщение
message.attach(html_part)

# Подключаемся к SMTP серверу и отправляем письмо
with smtplib.SMTP_SSL("smtp.example.com", 465) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())

# Итог:
# Использование HTML шаблонов для отправки email в Python делает письма более гибкими и профессиональными.
# Вы можете добавлять стили, ссылки и изображения, что позволяет создавать более информативные и красивые email-сообщения.
