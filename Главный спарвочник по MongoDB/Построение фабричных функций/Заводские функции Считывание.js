// Глава 1: Введение в MongoDB (mongoose) - Заводские функции Считывание

// В этом разделе мы рассмотрим функции для считывания данных из MongoDB с использованием Mongoose.
// Эти функции позволяют легко управлять операциями получения данных, такими как получение одного документа или списка документов.

// Функция для получения одного документа по ID
exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);

        // Если указаны опции для пополнения, добавляем их к запросу
        if (popOptions) query = query.populate(popOptions);

        // Выполняем запрос к базе данных
        const doc = await query;

        // Если документ не найден, передаем ошибку
        if (!doc) {
            return next(new AppError("No document found with that ID!", 404));
        }

        // Возвращаем найденный документ в ответе
        res.status(200).json({
            status: "success",
            data: {
                data: doc,
            },
        });
    });

// Функция для получения всех документов модели
exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        let filter = {};
        // Если передан ID тура, добавляем фильтрацию по нему
        if (req.params.tourId) filter = { tour: req.params.tourId };

        // Создаем экземпляр класса APIFeatures для обработки запросов
        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        // Выполняем запрос и получаем документы
        const doc = await features.query;

        // Возвращаем список найденных документов в ответе
        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                data: doc,
            },
        });
    });

// Функция для установки идентификаторов тура и пользователя
exports.setTourUserIds = (req, res, next) => {
    // Если идентификатор тура не передан в теле запроса, устанавливаем его из параметров
    if (!req.body.tour) req.body.tour = req.params.tourId;
    // Если идентификатор пользователя не передан, устанавливаем его из параметров
    if (!req.body.user) req.body.user = req.params.id;
    next();
};

// Использование функции для получения тура с связанными отзывами
exports.getTour = factory.getOne(Tour, { path: "reviews" });

// Итог:
// Эти функции обеспечивают гибкий и удобный способ взаимодействия с данными в MongoDB,
// позволяя легко получать как отдельные документы, так и списки, с возможностью фильтрации и пополнения связанных данных.
