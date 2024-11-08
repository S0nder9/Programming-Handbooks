// Глава 1: Введение в MongoDB (mongoose) - Предотвращение дублирования отзывов

// В приложениях, где пользователи могут оставлять отзывы, важно предотвратить повторное добавление отзывов от одного и того же пользователя для одного и того же объекта.
// В этой главе мы рассмотрим, как использовать Mongoose для предотвращения дублирования отзывов с помощью индексов и других методов.

// Предотвращение дублирования отзывов с помощью индекса в Mongoose:
// В Mongoose мы можем создать уникальный индекс, чтобы предотвратить добавление более одного отзыва от одного пользователя к одному объекту (например, туру).
// Это достигается за счет установки индекса на комбинацию полей `tour` и `user`.

// Пример схемы для отзыва с уникальным индексом на `tour` и `user`:
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review text is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1.0'],
    max: [5, 'Rating must be at most 5.0'],
    // Округляем рейтинг до одной десятой для удобства
    set: (value) => Math.round(value * 10) / 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user'],
  },
});
// ///////////////////////

// Устанавливаем уникальный индекс на комбинацию полей `tour` и `user`
reviewSchema.index(
  { tour: 1, user: 1 },
  {
    unique: true, // гарантирует, что пользователь может оставить только один отзыв на один тур
  }
);

// ///////////////////////

// Средний рейтинг отзывов (ratingAverage):
// Мы можем добавить поле `ratingAverage` в схему, чтобы хранить средний рейтинг для туров.
// При этом округляем значение до одной десятой, чтобы сохранить точность, но избежать лишних дробных знаков.

reviewSchema.statics.calcAverageRatings = async function(tourId) {
  const stats = await this.aggregate([
    { $match: { tour: tourId } },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await this.model('Tour').findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: Math.round(stats[0].avgRating * 10) / 10,
    });
  } else {
    await this.model('Tour').findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5, // Значение по умолчанию, если отзывов нет
    });
  }
};

// Middleware для обновления среднего рейтинга после сохранения нового отзыва
reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.tour);
});

// Экспортируем модель
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

// Итог:
// Уникальный индекс позволяет предотвратить дублирование отзывов от одного и того же пользователя для одного тура.
// Мы также добавили механизм для расчета и округления среднего рейтинга для каждого тура.
