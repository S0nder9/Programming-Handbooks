// Глава 1: Введение в MongoDB (mongoose) - Отправка JWT через cookie

// При создании приложений с использованием MongoDB и mongoose для управления данными, нередко требуется аутентификация пользователей.
// Один из популярных способов аутентификации — это отправка JWT (JSON Web Token) через cookie для безопасного хранения токена на клиентской стороне.
// Ниже приведен пример отправки JWT через cookie.

// Установка параметров cookie:
// Чтобы задать срок действия cookie и запретить доступ к нему из JavaScript на клиенте, используем следующие настройки:

const cookieOptions = {
    expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // Время жизни cookie
    ),
    httpOnly: true, // Запрещает доступ к cookie из JavaScript
};

// Функция для создания и отправки токена вместе с cookie:
// Эта функция принимает `user`, `statusCode` и `res` (объект ответа) в качестве аргументов.
// Она создает JWT с идентификатором пользователя (`user._id`), отправляет его в cookie и возвращает JSON-ответ, содержащий токен и данные пользователя.

const createSendToken = (user, statusCode, res) => {
    // Создаем JWT для пользователя
    const token = signToken(user._id);

    // Если приложение работает в режиме "production", делаем cookie защищенной
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    // Отправляем токен в cookie
    res.cookie("jwt", token, cookieOptions);

    // Убираем пароль из данных пользователя перед отправкой ответа
    user.password = undefined;

    // Отправляем ответ с токеном и данными пользователя
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

// Описание параметров:
// - `user`: объект пользователя, полученный из базы данных, который содержит его идентификатор `_id`.
// - `statusCode`: HTTP-статус код, который указывает на успешность операции (например, 200 для успешного запроса).
// - `res`: объект ответа, который используется для отправки cookie и JSON-ответа на клиент.

// Пример использования функции createSendToken в контроллере аутентификации:
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Находим пользователя по email
    const user = await User.findOne({ email }).select("+password");

    // Проверяем правильность пароля
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({ status: "fail", message: "Invalid email or password" });
    }

    // Создаем и отправляем токен через cookie
    createSendToken(user, 200, res);
};

// Итог:
// Использование JWT вместе с cookie позволяет безопасно хранить токен на клиенте и использовать его для аутентификации в приложении.
// Эта схема особенно удобна для защиты маршрутов, проверки подлинности пользователя и предоставления доступа к защищенным ресурсам.
