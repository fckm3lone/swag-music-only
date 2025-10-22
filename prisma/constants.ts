// constants.ts

// Категории
import {generateSlug} from "../services/generateSlug";

export const categories = [

    { name: 'String' },
    { name: 'Keyboard' },
    { name: 'Wind' },
    { name: 'Drum' },
    { name: 'Synth' },
    { name: 'Microphones' },
];



// Бренды
export const brands = [
    { name: 'Roland' },
    { name: 'Yamaha' },
    { name: 'Rode' },
    { name: 'Sven' },
    { name: 'Jbl' },
    { name: 'Hoco' },
    { name: 'Neuman' },
];

// Цвета
export const colors = [
    { name: 'White' },
    { name: 'Black' },
    { name: 'Red' },
    { name: 'Yellow' },
    { name: 'Blue' },
    { name: 'Orange' },
    { name: 'Brown' },
    { name: 'Natural' },
];

// Типы
export const types = [
    { name: 'Digital Piano', categoryId: 1 }, // Предполагаем, что Keyboard получит id: 1
    { name: 'Acoustic Guitar', categoryId: 2 }, // String -> id: 2
    { name: 'Condenser Microphone', categoryId: 3 }, // Microphones -> id: 3
];

// Группы атрибутов
export const attributeGroups = [
    { name: 'Piano Specs', categoryId: 1 },
    { name: 'Guitar Specs', categoryId: 2 },
    { name: 'Microphone Specs', categoryId: 3 },
];

// Атрибуты
export const attributes = [
    // Для пианино
    { name: 'Количество клавиш', attributeGroupId: 1 },
    { name: 'Тип клавиатуры', attributeGroupId: 1 },
    { name: 'Дисплей', attributeGroupId: 1 },
    { name: 'Суммарная мощность акустики', attributeGroupId: 1 },
    { name: 'Адаптер в комплекте', attributeGroupId: 1 },
    { name: 'Линейный выход', attributeGroupId: 1 },
    { name: 'USB', attributeGroupId: 1 },
    { name: 'Стойка в комплекте', attributeGroupId: 1 },
    // Для гитары
    { name: 'Тип', attributeGroupId: 2 },
    { name: 'Количество струн', attributeGroupId: 2 },
    // Для микрофона
    { name: 'Тип', attributeGroupId: 3 },
];

// Продукты
export const rawProducts = [
    {
        name: 'ROLAND FP-30X-BK',
        description:
            'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.',
        price: 850.0,
        categoryId: 1,
        brandId: 1,
        colorId: 1,
        typeId: 1,
        availability:'Available'
    },
    {
        name: 'YAMAHA F310',
        description: 'YAMAHA F310 — отличная акустическая гитара для начинающих.',
        price: 210.0,
        categoryId: 2,
        brandId: 2,
        colorId: 2,
        typeId: 2,
        availability:'Available'
    },
    {
        name: 'RODE NT1',
        description: 'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.',
        price: 350.0,
        categoryId: 3,
        brandId: 3,
        colorId: 1,
        typeId: 3,
        availability:'Available'
    },
    {
        name: 'ROLAND FP-30X-B',
        description:
            'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.',
        price: 850.0,
        categoryId: 1,
        brandId: 1,
        colorId: 1,
        typeId: 1,
        availability:'On order'
    },
    {
        name: 'YAMAHA F31',
        description: 'YAMAHA F310 — отличная акустическая гитара для начинающих.',
        price: 210.0,
        categoryId: 2,
        brandId: 2,
        colorId: 2,
        typeId: 2,
        availability:'On order'
    },
    {
        name: 'RODE NT2',
        description: 'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.',
        price: 350.0,
        categoryId: 3,
        brandId: 3,
        colorId: 1,
        typeId: 3,
        availability:'On order'
    },
];

export const products = rawProducts.map((p) => ({
    ...p,
    slug: generateSlug(p.name), // 👈 генерируем slug автоматически
}));

// Изображения продуктов
export const productImages = [
    // Для продукта ROLAND FP-30X-BK (productId: 1)
    { url: '/products/piano-1.png', productId: 1 },
    { url: '/products/microphone-1.png', productId: 1 },
    { url: '/products/piano-1.png', productId: 1 },
    { url: '/products/microphone-1.png', productId: 1 },
    { url: '/products/guitar-1.png', productId: 1 },
    { url: '/products/piano-1.png', productId: 1 },
    // Для продукта YAMAHA F310 (productId: 2)
    { url: '/products/guitar-1.png', productId: 2 },
    { url: '/products/guitar-1.png', productId: 2 },
    { url: '/products/piano-1.png', productId: 2 },
    { url: '/products/microphone-1.png', productId: 2 },
    // Для продукта RODE NT1 (productId: 3)
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/piano-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/piano-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    // Для второго ROLAND FP-30X-BK (productId: 4)
    { url: '/products/piano-1.png', productId: 4 },
    { url: '/products/microphone-1.png', productId: 4 },
    { url: '/products/piano-1.png', productId: 4 },
    { url: '/products/microphone-1.png', productId: 4 },
    { url: '/products/guitar-1.png', productId: 4 },
    { url: '/products/piano-1.png', productId: 4 },
    // Для второго YAMAHA F310 (productId: 5)
    { url: '/products/guitar-1.png', productId: 5 },
    { url: '/products/guitar-1.png', productId: 5 },
    { url: '/products/piano-1.png', productId: 5 },
    { url: '/products/microphone-1.png', productId: 5 },
    // Для второго RODE NT1 (productId: 6)
    { url: '/products/microphone-1.png', productId: 6 },
    { url: '/products/piano-1.png', productId: 6 },
    { url: '/products/microphone-1.png', productId: 6 },
    { url: '/products/piano-1.png', productId: 6 },
    { url: '/products/microphone-1.png', productId: 6 },
];

// Атрибуты продуктов
export const productAttributes = [
    // Для продукта ROLAND FP-30X-BK (productId: 1)
    { value: '88', productId: 1, attributeId: 1 },
    { value: 'молоточковая', productId: 1, attributeId: 2 },
    { value: 'нет', productId: 1, attributeId: 3 },
    { value: '15-24 Вт', productId: 1, attributeId: 4 },
    { value: 'да', productId: 1, attributeId: 5 },
    { value: 'да', productId: 1, attributeId: 6 },
    { value: 'да', productId: 1, attributeId: 7 },
    { value: 'нет', productId: 1, attributeId: 8 },
    // Для продукта YAMAHA F310 (productId: 2)
    { value: 'акустическая гитара', productId: 2, attributeId: 9 },
    { value: '6', productId: 2, attributeId: 10 },
    // Для продукта RODE NT1 (productId: 3)
    { value: 'конденсаторный микрофон', productId: 3, attributeId: 11 },
    // Для второго ROLAND FP-30X-BK (productId: 4)
    { value: '88', productId: 4, attributeId: 1 },
    { value: 'молоточковая', productId: 4, attributeId: 2 },
    { value: 'нет', productId: 4, attributeId: 3 },
    { value: '15-24 Вт', productId: 4, attributeId: 4 },
    { value: 'да', productId: 4, attributeId: 5 },
    { value: 'да', productId: 4, attributeId: 6 },
    { value: 'да', productId: 4, attributeId: 7 },
    { value: 'нет', productId: 4, attributeId: 8 },
    // Для второго YAMAHA F310 (productId: 5)
    { value: 'акустическая гитара', productId: 5, attributeId: 9 },
    { value: '6', productId: 5, attributeId: 10 },
    // Для второго RODE NT1 (productId: 6)
    { value: 'конденсаторный микрофон', productId: 6, attributeId: 11 },
];