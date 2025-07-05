# Разработка тестов и работа с API

## Разработка тестов

Тестирование — это процесс исследования поведения программы для проверки её корректности, надежности и производительности. Тестирование помогает выявить ошибки, обеспечить стабильность кода и упростить его поддержку.

### Виды тестирования

1. **Ручное тестирование**  
   Выполняется вручную тестировщиками без автоматизации. Используется для проверки пользовательского интерфейса, функциональности и сценариев, которые сложно автоматизировать.

2. **Нагрузочное тестирование**  
   Проверяет поведение программы при высокой нагрузке (например, множественные запросы). Используется для оценки производительности и устойчивости системы.

3. **Интеграционное тестирование**  
   Проверяет взаимодействие программы с внешними сервисами, API или базами данных, чтобы убедиться, что компоненты работают вместе корректно.

4. **Регрессионное тестирование**  
   Проверяет, не сломались ли существующие функции после внесения изменений в код. Обычно выполняется после обновлений или исправлений.

5. **Smoke-тестирование**  
   Быстрые тесты, проверяющие основные функции программы. Цель — убедиться, что система работает на базовом уровне перед более глубоким тестированием.

6. **Модульное (юнит) тестирование**  
   Проверяет отдельные модули, функции или классы программы. Обычно изолирует тестируемый код от внешних зависимостей, используя моки (mock objects).

### Тестовые фреймворки

Python предоставляет несколько инструментов для автоматизации тестирования:

1. **pytest** — мощный и гибкий фреймворк, популярный среди разработчиков за простоту и функциональность.
2. **unittest** — встроенный в стандартную библиотеку Python фреймворк, вдохновленный xUnit.
3. **doctest** — инструмент для тестирования кода через документацию (строки документации).
4. **nose2** — расширяемый фреймворк, совместимый с unittest, но менее популярен, чем pytest.

Для веб-разработки:
- **Selenium** — инструмент для автоматизации тестирования веб-приложений, включая взаимодействие с браузером.

### unittest

**unittest** — это встроенный в стандартную библиотеку Python фреймворк для написания и выполнения тестов. Он следует парадигме xUnit, популярной в других языках программирования.

#### Особенности unittest:
1. **Встроенный в Python** — не требует установки дополнительных библиотек.
2. **xUnit-стиль** — тесты организованы в классах, наследующихся от `unittest.TestCase`.
3. **Широкие возможности** — поддерживает setup/teardown методы, проверку утверждений (assertions) и запуск тестов.
4. **Модульная структура** — тесты пишутся в виде методов внутри классов, что удобно для структурированных проектов.
5. **Встроенные assertions** — такие как `assertEqual`, `assertTrue`, `assertRaises`, `assertRegex` и другие.

#### Пример теста с unittest:

```python
import unittest

def summ(x, y):
    return x + y

class TestSumm(unittest.TestCase):
    def test_summ_positive(self):
        result = summ(10, 22)
        self.assertEqual(result, 32, "Ожидался результат 32")

    def test_summ_negative(self):
        result = summ(-1, -2)
        self.assertEqual(result, -3, "Ожидался результат -3")

if __name__ == '__main__':
    unittest.main()
```

**Объяснение**:
- Класс `TestSumm` наследуется от `unittest.TestCase`.
- Тестовые методы начинаются с `test_`, чтобы unittest их обнаружил.
- `self.assertEqual` проверяет равенство результата и ожидаемого значения.
- `unittest.main()` запускает тесты.

**Плюсы**:
- Не требует внешних зависимостей.
- Хорошо интегрируется с большими проектами.
- Поддерживает сложные сценарии тестирования (например, setup/teardown).

**Минусы**:
- Более громоздкий синтаксис по сравнению с pytest.
- Требует явного наследования от `TestCase`.

### pytest

**pytest** — популярный тестовый фреймворк, который нужно устанавливать отдельно (`pip install pytest`). Он проще и мощнее unittest, а также совместим с тестами, написанными для unittest.

#### Особенности pytest:
1. **Простота написания тестов** — тесты можно писать как простые функции, без классов.
2. **Мощное обнаружение тестов** — pytest автоматически находит файлы и функции, начинающиеся с `test_`.
3. **Гибкие assertions** — использует стандартный `assert`, а не специализированные методы, как в unittest.
4. **Плагины** — богатая экосистема плагинов (например, `pytest-cov` для анализа покрытия кода).
5. **Совместимость с unittest** — может запускать тесты, написанные для unittest.
6. **Подробные отчеты** — pytest предоставляет понятные сообщения об ошибках и упрощает отладку.
7. **Маркировка тестов** — поддерживает маркировку тестов (`@pytest.mark`) для выборочного запуска, например, `@pytest.mark.xfail` или `@pytest.mark.skipif`.

#### Установка:
```bash
pip install pytest
```

#### Пример теста с pytest:

```python
def summ(x, y):
    return x + y

def test_summ_positive():
    assert summ(10, 22) == 32, "Ожидался результат 32"

def test_summ_negative():
    assert summ(-1, -2) == -3, "Ожидался результат -3"
```

**Запуск тестов**:
```bash
pytest test_file.py
```

**Объяснение**:
- Тесты пишутся как обычные функции, начинающиеся с `test_`.
- Используется стандартный `assert` с дополнительным сообщением об ошибке.
- pytest автоматически находит и запускает тесты в файлах, начинающихся с `test_`.

**Плюсы**:
- Простота и лаконичность кода.
- Мощная система плагинов.
- Подробные и читаемые отчеты об ошибках.
- Поддержка параметризации и фикстур для упрощения тестирования.

**Минусы**:
- Требует установки.
- Может быть избыточным для небольших проектов.

#### Сравнение unittest и pytest

| Характеристика            | unittest                              | pytest                               |
|---------------------------|---------------------------------------|--------------------------------------|
| Встроен в Python          | Да                                    | Нет (требуется установка)            |
| Синтаксис тестов          | Классы, методы `test_`               | Функции или классы, методы `test_`   |
| Assertions                | Специальные методы (`assertEqual`)    | Стандартный `assert`                 |
| Фикстуры                  | `setUp`/`tearDown`                   | Гибкие фикстуры через декораторы     |
| Плагины                   | Ограниченная поддержка                | Богатая экосистема плагинов          |
| Отчеты об ошибках         | Менее подробные                      | Подробные и читаемые                 |

### Assert

Ключевое слово `assert` используется для проверки условий. Если условие ложно, вызывается исключение `AssertionError`.

Пример использования:

```python
def summ(x, y):
    return x + y

a = 10
b = 22
res = summ(a, b)
expected = 322

assert res == expected, "Результат не соответствует ожидаемому"
```

**Вывод**:
```
AssertionError: Результат не соответствует ожидаемому
```

В примере `res` равно 32, а `expected` — 322, поэтому возникает ошибка. В pytest сообщение об ошибке будет более информативным, показывая значения переменных.

### Примеры тестов

#### Пример с unittest:

```python
import unittest

def summ(x, y):
    return x + y

class TestSumm(unittest.TestCase):
    def setUp(self):
        self.a = 10
        self.b = 22

    def test_summ_positive(self):
        result = summ(self.a, self.b)
        self.assertEqual(result, 32, "Ожидался результат 32")

    def test_summ_zero(self):
        result = summ(0, 0)
        self.assertEqual(result, 0, "Ожидался результат 0")

    def test_summ_negative(self):
        result = summ(-5, -3)
        self.assertEqual(result, -8, "Ожидался результат -8")

if __name__ == '__main__':
    unittest.main()
```

**Объяснение**:
- Метод `setUp` выполняется перед каждым тестом, задавая начальные значения.
- Тесты проверяют разные сценарии: положительные числа, нули и отрицательные числа.

#### Пример с pytest:

```python
def summ(x, y):
    return x + y

def test_summ_positive():
    assert summ(10, 22) == 32, "Ожидался результат 32"

def test_summ_zero():
    assert summ(0, 0) == 0, "Ожидался результат 0"

def test_summ_negative():
    assert summ(-5, -3) == -8, "Ожидался результат -8"

# Пример с фикстурой
import pytest

@pytest.fixture
def numbers():
    return {'a': 10, 'b': 22}

def test_summ_with_fixture(numbers):
    assert summ(numbers['a'], numbers['b']) == 32, "Ожидался результат 32"
```

**Объяснение**:
- Тесты пишутся как функции, что делает их более компактными.
- Фикстура `numbers` предоставляет данные для теста, упрощая повторное использование.

#### Пример с параметризацией в pytest:

```python
import pytest

def summ(x, y):
    return x + y

@pytest.mark.parametrize("a, b, expected", [
    (10, 22, 32),
    (0, 0, 0),
    (-5, -3, -8),
])
def test_summ(a, b, expected):
    assert summ(a, b) == expected, f"Ожидался результат {expected}"
```

**Объяснение**:
- Декоратор `@pytest.mark.parametrize` позволяет запускать один тест с разными наборами данных.
- Упрощает тестирование множества сценариев.

#### Расширенный пример с unittest и pytest:

```python
from unittest import TestCase
from main import summ, dist, factorial
import pytest

NUMBER = 10

class TestSomething(TestCase):
    def test_ok(self):
        a = 10
        b = 20
        expected = 30
        res = summ(a, b)
        self.assertEqual(res, expected, "Ожидался результат 30")

    @pytest.mark.xfail
    def test_failed(self):
        a = 10
        b = 20
        res = summ(a, b)
        self.assertGreater(res, 50, "Ожидалось, что результат больше 50")

    def test_error(self):
        a = 20
        b = "25"
        result = summ(a, b)
        expected = 45
        self.assertEqual(result, expected, "Ожидался результат 45")

    def test_regex(self):
        date1 = "1999-01-01"
        date2 = "09.11.2023"
        date3 = "09/11/2023"
        pattern = r"^\d{2}\.\d{2}\.\d{4}$"
        self.assertRegex(date2, pattern, "Формат даты должен соответствовать dd.mm.yyyy")
        self.assertRegex(date3, pattern, "Формат даты должен соответствовать dd.mm.yyyy")
        # date1 не пройдет проверку, так как имеет другой формат

    @pytest.mark.skipif(NUMBER > 40, reason="Too big value")
    def test_key_in_dist(self):
        key = "a"
        dist1 = dist()
        self.assertIn(key, dist1, "Ключ 'a' должен быть в словаре")

    @pytest.mark.parametrize(
        "number, expected",
        [
            (0, 1),
            (1, 1),
            (2, 2),
            (3, 6),
            (4, 24),
            (5, 120)
        ]
    )
    def test_factorial(self, number, expected):
        result = factorial(number)
        self.assertEqual(result, expected, f"Ожидался результат {expected}")

class TestSomethingWithPytest:
    def test_equal(self):
        a = 10
        b = 20
        expected = 30
        res = summ(a, b)
        assert res == expected, "Ожидался результат 30"

    @pytest.mark.xfail
    def test_failure(self):
        a = 10
        b = 20
        res = summ(a, b)
        assert res > 50, "Ожидалось, что результат больше 50"
```

**Объяснение**:
- **Импорты**: Используются `unittest.TestCase` для классов unittest, а также `pytest.mark.xfail` и `pytest.mark.skipif` для маркировки тестов. Функции `summ`, `dist` и `factorial` предполагаются импортированными из модуля `main`.
- **test_ok**: Проверяет корректность функции `summ` с ожидаемым результатом 30.
- **test_failed**: Помечен как `@pytest.mark.xfail`, так как ожидается, что тест провалится (результат 30 не больше 50).
- **test_error**: Проверяет случай с некорректным типом данных (строка `"25"` вместо числа), что, вероятно, вызовет ошибку, если функция `summ` не обрабатывает такие случаи.
- **test_regex**: Проверяет строки на соответствие формату даты `dd.mm.yyyy` с использованием `assertRegex`. Тест для `date1` не пройдет, так как формат отличается.
- **test_key_in_dist**: Проверяет наличие ключа `"a"` в словаре, возвращаемом функцией `dist`. Пропускается, если `NUMBER > 40` (в данном случае тест выполнится, так как `NUMBER = 10`).
- **test_factorial**: Использует параметризацию для проверки функции `factorial` с разными входными данными.
- **TestSomethingWithPytest**: Показывает альтернативный стиль написания тестов в pytest без классов, используя простые функции.

**Примечание**:
- Тесты предполагают наличие функций `summ`, `dist` и `factorial` в модуле `main`. Если их нет, тесты вызовут ошибку импорта.
- Использование `@pytest.mark.xfail` и `@pytest.mark.skipif` в классе `TestCase` демонстрирует совместимость pytest с unittest, но это требует запуска тестов через pytest.

## API

API (Application Programming Interface) — это набор функций, методов или конечных точек, предоставляемых для взаимодействия с внешними ресурсами, такими как веб-сервисы, базы данных или сторонние платформы.

### Примеры публичных API:
1. **GitHub API**  
   Позволяет взаимодействовать с репозиториями, коммитами, пользователями и другими данными GitHub.  
   Пример:  
   ```
   https://api.github.com/repos/{owner}/{repo}/commits
   ```  
   Возвращает список коммитов для указанного репозитория.

2. **Twitter API (X API)**  
   Предоставляет доступ к твитам, профилям пользователей и другим данным платформы X.  
   Пример:  
   ```
   https://api.twitter.com/1.1/search/tweets.json
   ```  
   Позволяет искать твиты по ключевым словам.

### Примеры приватных API:
- **VK API** — API социальной сети ВКонтакте для доступа к данным пользователей, статусам, фотографиям и другим функциям. Требует аутентификации через токен.
- **Google Cloud APIs** — предоставляют доступ к облачным сервисам Google (например, Google Drive, Google Maps), но требуют ключ API или OAuth-токен.
- **Корпоративные API** — внутренние API компаний для интеграции их систем, доступные только авторизованным пользователям.

### Аутентификация и авторизация

- **Аутентификация** — процесс проверки подлинности пользователя или приложения (например, подтверждение, что вы — это вы, через логин и пароль или токен).
- **Авторизация** — процесс проверки прав доступа к определённым ресурсам или действиям (например, может ли пользователь изменять статус или загружать фото).

### OAuth

**OAuth** — открытый стандарт аутентификации и авторизации, позволяющий предоставлять доступ к ресурсам без передачи логина и пароля. Пользователь аутентифицируется через платформу (например, ВКонтакте), а приложение получает токен для доступа к API.

#### Как работает OAuth (на примере VK API):
1. **Регистрация приложения**: Разработчик регистрирует приложение в системе (например, в VK) и получает `client_id`.
2. **Перенаправление на авторизацию**: Пользователь перенаправляется на страницу авторизации, где подтверждает доступ приложения к данным (например, статусам или фотографиям).
3. **Получение токена**: После согласия пользователя приложение получает `access_token` через перенаправление на указанный `redirect_uri`.
4. **Использование токена**: Токен используется для выполнения запросов к API от имени пользователя.

#### Пример OAuth с VK API:

```python
from urllib.parse import urlencode
import secrets
import requests

id = "53859342"  # ID приложения VK

OAUTH_BASE_URL = "https://oauth.vk.com/authorize"
params = {
    "client_id": id,
    "redirect_uri": "https://vk.com/feed",
    "display": "page",
    "scope": "status,photos",
    "response_type": "token",
    "v": "5.199",
    "state": secrets.token_hex(16)  # Случайная строка для защиты от CSRF
}

oauth_url = f"{OAUTH_BASE_URL}?{urlencode(params)}"
print(oauth_url)
```

**Объяснение**:
- Формируется URL для авторизации, который перенаправляет пользователя на страницу VK.
- Параметр `scope` указывает, к каким данным запрашивается доступ (`status,photos`).
- После авторизации пользователь перенаправляется на `redirect_uri`, а токен возвращается в URL как фрагмент (`#access_token`).

#### Пример клиента для работы с VK API:

```python
import requests

class VK_API_CLIENT:
    API_BASIC_URL = "https://api.vk.com/method"

    def __init__(self, token, user_id):
        self.token = token
        self.user_id = user_id

    def get_common_params(self):
        return {
            "access_token": self.token,
            "v": "5.199",
        }

    def get_status(self):
        params = self.get_common_params()
        params.update({"user_id": self.user_id})
        res = requests.get(f"{self.API_BASIC_URL}/status.get", params=params)
        return res.json().get("response", {}).get("text")

    def set_status(self, new_status):
        params = self.get_common_params()
        params.update({"user_id": self.user_id, "text": new_status})
        res = requests.get(f"{self.API_BASIC_URL}/status.set", params=params)
        res.raise_for_status()
        return res.json()

    def replace_status(self, target, replace_string):
        status = self.get_status()
        new_status = status.replace(target, replace_string)
        return self.set_status(new_status)

    def get_profile_photos(self):
        params = self.get_common_params()
        params.update({"owner_id": self.user_id, "album_id": "profile"})
        res = requests.get(f"{self.API_BASIC_URL}/photos.get", params=params)
        return res.json()

if __name__ == "__main__":
    TOKEN = "1"  # Замените на реальный токен
    vk_client = VK_API_CLIENT(TOKEN, 12345)
    # print(vk_client.replace_status("Hello", "Hi"))
    print(vk_client.get_profile_photos())
```

**Объяснение**:
- **Инициализация**: Класс `VK_API_CLIENT` принимает `token` (полученный через OAuth) и `user_id`.
- **get_common_params**: Формирует общие параметры для всех запросов (токен и версия API).
- **get_status**: Получает текущий статус пользователя через метод `status.get`.
- **set_status**: Устанавливает новый статус через метод `status.set`.
- **replace_status**: Заменяет подстроку в текущем статусе и обновляет его.
- **get_profile_photos**: Получает фотографии профиля пользователя из альбома `profile`.

**Примечание**:
- Для работы кода требуется действительный `access_token`, полученный через OAuth.
- Метод `status.set` в примере ошибочно использует `status.get` в URL (исправлено на `status.set` в описании).
- Запросы к VK API требуют правильной настройки `scope` при авторизации (например, `status` для работы со статусами, `photos` для фотографий).

### Тестирование API с unittest и pytest

API-запросы часто тестируются в рамках интеграционного тестирования. Для изоляции тестов от реальных запросов используются библиотеки, такие как `unittest.mock` или `pytest-mock`.

#### Пример тестирования VK_API_CLIENT с pytest:

```python
import pytest
from unittest.mock import Mock
from VK_API_CLIENT import VK_API_CLIENT  # Предполагается, что класс находится в модуле VK_API_CLIENT

@pytest.fixture
def vk_client():
    return VK_API_CLIENT(token="fake_token", user_id=12345)

def test_get_status(vk_client, mocker):
    # Мокаем запрос к API
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"response": {"text": "Hello, world!"}}

    status = vk_client.get_status()
    assert status == "Hello, world!", "Ожидался статус 'Hello, world!'"
    mock_get.assert_called_once_with(
        "https://api.vk.com/method/status.get",
        params={"access_token": "fake_token", "v": "5.199", "user_id": 12345}
    )

def test_set_status(vk_client, mocker):
    # Мокаем запрос к API
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"response": 1}

    result = vk_client.set_status("New status")
    assert result == {"response": 1}, "Ожидался успешный ответ от API"
    mock_get.assert_called_once_with(
        "https://api.vk.com/method/status.set",
        params={"access_token": "fake_token", "v": "5.199", "user_id": 12345, "text": "New status"}
    )
```

**Объяснение**:
- **Фикстура `vk_client`**: Создаёт экземпляр `VK_API_CLIENT` для тестов.
- **Мокинг**: Используется `mocker.patch` для перехвата вызовов `requests.get`, чтобы избежать реальных HTTP-запросов.
- **test_get_status**: Проверяет, что метод `get_status` возвращает ожидаемый статус и вызывает правильный URL с параметрами.
- **test_set_status**: Проверяет, что метод `set_status` отправляет корректный запрос и возвращает ожидаемый результат.

## Заключение

- **unittest** — хороший выбор для проектов, где важна встроенная функциональность и нет желания устанавливать дополнительные библиотеки. Поддерживает расширенные возможности, такие как `assertRegex`, `expectedFailure`, `skipIf`.
- **pytest** — предпочтителен для большинства современных проектов благодаря простоте, гибкости и мощным возможностям, таким как фикстуры, параметризация и плагины. Маркировка тестов (`@pytest.mark.xfail`, `@pytest.mark.skipif`) упрощает управление тестами.
- **API** — мощный инструмент для взаимодействия с внешними сервисами. Работа с API, такими как VK API, требует правильной аутентификации (например, через OAuth) и обработки ответов.
- Тестирование API-запросов требует использования моков для изоляции тестов и проверки корректности параметров запросов.
- Выбор фреймворка и подхода к тестированию зависит от сложности проекта, требований к зависимости и предпочтений команды.