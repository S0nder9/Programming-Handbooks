// Глава 1: Введение в MongoDB (mongoose)
// Места моделирования (геопространственные данные)

// В MongoDB с использованием библиотеки Mongoose можно эффективно моделировать данные, включающие геопространственную информацию,
// что особенно полезно для приложений, работающих с картами и локациями. Пример ниже демонстрирует, как задать схему для 
// туристического тура с несколькими местами и координатами локаций.

// Определение схемы тура:
const mongoose = require('mongoose');

// Создаем схему тура
const tourSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A tour must have a name!"],
            unique: true,
            trim: true,
            maxlenght: [
                40,
                "A tour name must have less or equal then 40 characters!",
            ],
            minlenght: [
                10,
                "A tour name must have more or equal then 10 characters!",
            ],
        },
        slug: String,
        duration: {
            type: Number,
            required: [true, "A tour must have a duration!"],
        },
        maxGroupSize: {
            type: Number,
            required: [true, "A tour must have a group size!"],
        },
        difficulty: {
            type: String,
            required: [true, "A tour must have a difficulty!"],
            enum: {
                values: ["easy", "medium", "difficult"],
                message: "Difficulty is either: easy, medium, difficult!",
            },
        },
        raitingsAverage: {
            type: Number,
            default: 0,
            min: [1, "Ratings must be above 1.0"],
            max: [5, "Ratings must be below 5.0"],
        },
        raitingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "A tour must have a price!"],
        },
        priceDiscount: {
            type: Number,
            validate: {
                message:
                    "Discount price ({VALUE}) should be below regular price!",
                validator: function (val) {
                    return val < this.price;
                },
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, "A tour must have a description!"],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            trim: true,
            required: [true, "A tour must have a cover image!"],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
        
        // Основное место начала тура
        startLocation: {
            type: {
                type: String,
                default: "Point",
                enum: ["Point"], // Геопространственные данные требуют указания типа "Point"
            },
            coordinates: [Number], // [долгота, широта]
            address: String,
            description: String,
        },

        // Массив локаций, который определяет все места, посещаемые в туре
        locations: [
            {
                type: {
                    type: String,
                    default: "Point",
                    enum: ["Point"],
                },
                coordinates: [Number], // [долгота, широта]
                address: String,
                description: String,
                day: Number // День тура, когда посещается это место
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Создание модели на основе схемы
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

// Пример объекта для тура с геопространственными данными:
{
    "name": "Patagonia Glaciers Expedition",
    "slug": "patagonia-glaciers-expedition",
    "duration": 8,
    "maxGroupSize": 10,
    "difficulty": "difficult",
    "raitingsAverage": 4.9,
    "raitingsQuantity": 90,
    "price": 2100,
    "summary": "Adventure through the stunning glaciers of Patagonia.",
    "description": "Explore the awe-inspiring glaciers and rugged beauty of Patagonia.",
    "imageCover": "patagonia-cover.jpg",
    "images": ["patagonia1.jpg", "patagonia2.jpg"],
    "startDates": ["2023-01-15", "2023-02-28", "2023-11-15"],
    "startLocation": {
        "type": "Point",
        "coordinates": [-73.2425, -49.3242],
        "address": "Patagonia, Argentina",
        "description": "Meeting point in the heart of Patagonia."
    },
    "locations": [
        {
            "type": "Point",
            "coordinates": [-73.2425, -49.3242],
            "address": "Perito Moreno Glacier",
            "description": "Trek along the famous glacier.",
            "day": 2
        },
        {
            "type": "Point",
            "coordinates": [-73.1999, -50.3429],
            "address": "Upsala Glacier",
            "description": "Visit the impressive Upsala Glacier.",
            "day": 5
        }
    ]
}

// Итог:
// Данная схема демонстрирует возможности моделирования геопространственных данных в MongoDB.
// Схема включает основное место начала тура (startLocation) и массив мест (locations), которые могут быть отображены на карте или использованы для маршрутизации.
// Используя геопространственные данные, можно создавать мощные и информативные туры, охватывающие различные локации.
