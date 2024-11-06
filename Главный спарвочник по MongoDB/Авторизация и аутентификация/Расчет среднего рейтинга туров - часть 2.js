// Глава 1: Введение в MongoDB (mongoose) - Расчет среднего рейтинга туров - часть 2

// В этой части мы рассмотрим, как настроить вычисление среднего рейтинга для туров с использованием mongoose.
// Mongoose позволяет использовать middleware (промежуточные функции) для выполнения дополнительных действий до или после определенных операций с данными.
// Мы применим middleware к операциям обновления и удаления, чтобы автоматически пересчитывать средний рейтинг для туров, когда добавляются или удаляются отзывы.

// Пример кода с использованием mongoose middleware:

// Определение pre-хука для /^findOneAnd/ операций
// Этот pre-хук будет выполняться перед выполнением операции findOneAndUpdate или findOneAndDelete.
// Он находит один отзыв, который будет изменен или удален, и сохраняет его в this.r для последующего использования.
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();
    console.log(this.r); // Проверка, что отзыв был найден и сохранен в this.r
    next();
});

// Определение post-хука для /^findOneAnd/ операций
// Этот post-хук выполняется после успешного выполнения findOneAndUpdate или findOneAndDelete.
// Он вызывает метод calcAverageRating на конструкторе модели, используя идентификатор тура (this.r.tour), чтобы пересчитать средний рейтинг.
reviewSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcAverageRating(this.r.tour);
});

// Как это работает:
// 1. Pre-хук выполняется перед выполнением операции, чтобы найти и сохранить отзыв, который собираются обновить или удалить.
// 2. После успешного выполнения операции post-хук использует сохраненный отзыв для вызова calcAverageRating,
//    чтобы пересчитать средний рейтинг для соответствующего тура.
//    Это обеспечивает актуальность среднего рейтинга тура после изменения или удаления отзывов.

// Метод calcAverageRating (предполагается, что он определен на модели Review):
// calcAverageRating выполняет агрегирование для вычисления среднего рейтинга всех отзывов, связанных с определенным туром.

// Пример реализации calcAverageRating:
reviewSchema.statics.calcAverageRating = async function (tourId) {
    const stats = await this.aggregate([
        { $match: { tour: tourId } },
        {
            $group: {
                _id: '$tour',
                avgRating: { $avg: '$rating' },
                nRating: { $sum: 1 }
            }
        }
    ]);

    // Обновление поля в туре с рассчитанными значениями среднего рейтинга и количества отзывов
    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: stats[0].avgRating,
            ratingsQuantity: stats[0].nRating
        });
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsAverage: 4.5, // или значение по умолчанию
            ratingsQuantity: 0
        });
    }
};

// Итог:
// Использование pre и post хуков для findOneAnd операций позволяет автоматически поддерживать актуальный средний рейтинг туров в базе данных.
// Это пример мощной возможности mongoose для управления данными с использованием middleware и агрегаций.
