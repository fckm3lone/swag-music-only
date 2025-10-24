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
    { name: 'Digital Piano', categoryId: 2 }, // Предполагаем, что Keyboard получит id: 1
    { name: 'Acoustic Guitar', categoryId: 1 }, // String -> id: 2
    { name: 'Condenser Microphone', categoryId: 6 }, // Microphones -> id: 3
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
    { name: 'Пример 1', attributeGroupId: 1 },
    { name: 'Пример 2', attributeGroupId: 1 },
    { name: 'Пример 3', attributeGroupId: 1 },
    { name: 'Пример 4', attributeGroupId: 1 },
    { name: 'Пример 5', attributeGroupId: 1 },
    { name: 'Пример 6', attributeGroupId: 1 },
    { name: 'Пример 7', attributeGroupId: 1 },
    { name: 'Пример 8', attributeGroupId: 1 },
    // Для гитары
    { name: 'Тип', attributeGroupId: 2 },
    { name: 'Количество струн', attributeGroupId: 2 },
    { name: 'Пример 1', attributeGroupId: 2 },
    { name: 'Пример 2', attributeGroupId: 2 },
    { name: 'Пример 3', attributeGroupId: 2 },
    { name: 'Пример 4', attributeGroupId: 2 },
    { name: 'Пример 5', attributeGroupId: 2 },
    { name: 'Пример 6', attributeGroupId: 2 },
    { name: 'Пример 7', attributeGroupId: 2 },
    { name: 'Пример 8', attributeGroupId: 2 },
    // Для микрофона
    { name: 'Тип', attributeGroupId: 3 },
    { name: 'Пример 1', attributeGroupId: 3 },
    { name: 'Пример 2', attributeGroupId: 3 },
    { name: 'Пример 3', attributeGroupId: 3 },
    { name: 'Пример 4', attributeGroupId: 3 },
    { name: 'Пример 5', attributeGroupId: 3 },
    { name: 'Пример 6', attributeGroupId: 3 },
    { name: 'Пример 7', attributeGroupId: 3 },
    { name: 'Пример 8', attributeGroupId: 3 },
    // Дополнительные атрибуты (чтобы хватало по 15 на товар)
    // Для гитары (attributeGroupId: 2)
    { name: 'Пример 9', attributeGroupId: 2 },
    { name: 'Пример 10', attributeGroupId: 2 },
    { name: 'Пример 11', attributeGroupId: 2 },
    { name: 'Пример 12', attributeGroupId: 2 },
    { name: 'Пример 13', attributeGroupId: 2 },
    { name: 'Пример 14', attributeGroupId: 2 },
    { name: 'Пример 15', attributeGroupId: 2 },
    // Для микрофона (attributeGroupId: 3)
    { name: 'Пример 9', attributeGroupId: 3 },
    { name: 'Пример 10', attributeGroupId: 3 },
    { name: 'Пример 11', attributeGroupId: 3 },
    { name: 'Пример 12', attributeGroupId: 3 },
    { name: 'Пример 13', attributeGroupId: 3 },
    { name: 'Пример 14', attributeGroupId: 3 },
    { name: 'Пример 15', attributeGroupId: 3 },
];

// Продукты
// БАЗОВЫЕ товары (3 шт.)
const baseProducts = [
  {
    name: 'ROLAND FP-30X-BK',
    description:
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.' +
      'ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.',
    price: 850.0,
    categoryId: 2,
    brandId: 1,
    colorId: 1,
    typeId: 1,
    availability: 'Available',
  },
  {
    name: 'YAMAHA F310',
    description:
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
      'YAMAHA F310 — отличная акустическая гитара для начинающих.',
    price: 210.0,
    categoryId: 1,
    brandId: 2,
    colorId: 2,
    typeId: 2,
    availability: 'Available',
  },
  {
    name: 'RODE NT1',
    description:
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
      'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.',
    price: 350.0,
    categoryId: 6,
    brandId: 3,
    colorId: 1,
    typeId: 3,
    availability: 'Available',
  },
] as const;

// По 12 товаров на каждую базу (1 оригинал + 11 копий) => 36 товаров
const COPIES_PER_BASE = 11;

export const rawProducts = baseProducts.flatMap((p) => {
  const copies = Array.from({ length: COPIES_PER_BASE }, (_v, i) => ({
    ...p,
    name: `${p.name} ${i + 2}`,
    // немного варьируем наличие
    availability: i % 2 === 0 ? 'Available' : 'On order',
  }));
  return [p, ...copies];
});

export const products = rawProducts.map((p) => ({
    ...p,
    slug: generateSlug(p.name), // 👈 генерируем slug автоматически
}));

// Изображения продуктов
// Наборы изображений по типу товара
const imageSetsByType: Record<number, string[]> = {
  1: ['/products/piano-1.png', '/products/piano-2.png', '/products/piano-3.png'], // Digital Piano
  2: ['/products/guitar-1.png', '/products/guitar-2.png', '/products/guitar-3.png'], // Acoustic Guitar
  3: ['/products/microphone-1.png', '/products/microphone-1.png', '/products/microphone-1.png'], // Microphone (повторяем одно)
};

export const productImages = rawProducts.flatMap((p, idx) => {
  const productId = idx + 1;
  const set = imageSetsByType[p.typeId] ?? imageSetsByType[3];
  return set.map((url) => ({ url, productId }));
});

// Атрибуты продуктов
const pianoAttrs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const guitarAttrs = [17,18,19,20,21,22,23,24,25,26,36,37,38,39,40];
const micAttrs    = [27,28,29,30,31,32,33,34,35,43,44,45,46,47,48];

export const productAttributes = rawProducts.flatMap((p, idx) => {
  const productId = idx + 1;
  let ids: number[] = [];
  let values: string[] = [];

  if (p.typeId === 1) {
    ids = pianoAttrs;
    values = ['88', 'молоточковая', 'нет', '15-24 Вт', 'да', 'да', 'да', 'нет'];
  } else if (p.typeId === 2) {
    ids = guitarAttrs;
    values = ['акустическая гитара', '6'];
  } else {
    ids = micAttrs;
    values = ['конденсаторный микрофон'];
  }

  return ids.map((attributeId, i) => ({
    value: values[i] ?? '—',
    productId,
    attributeId,
  }));
});