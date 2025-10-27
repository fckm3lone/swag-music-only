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
    { name: 'Flight' },
    { name: 'Roy Benson' },
    { name: 'Tama' },
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
    { name: 'Ukulele', categoryId: 1 },
    { name: 'Acoustic drums complect', categoryId: 4},
    { name: 'Saxofon', categoryId: 3 }
];

// Группы атрибутов
export const attributeGroups = [
    { name: 'Piano Specs', categoryId: 1 },
    { name: 'String Specs', categoryId: 2 },
    { name: 'Microphone Specs', categoryId: 6 },
    { name: 'Wind Specs', categoryId: 3 },
    { name: 'Drum Specs', categoryId: 4 }

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
    // Для духовых (attributeGroupId: 4)

    { name: 'Тип инструмента', attributeGroupId: 4 },
    { name: 'Материал корпуса', attributeGroupId: 4 },
    { name: 'Тональность', attributeGroupId: 4 },
    { name: 'Материал клапанов', attributeGroupId: 4 },
    { name: 'Покрытие', attributeGroupId: 4 },
    { name: 'Комплектация', attributeGroupId: 4 },
    { name: 'Вес', attributeGroupId: 4 },
    { name: 'Длина', attributeGroupId: 4 },
    { name: 'Производство', attributeGroupId: 4 },
    { name: 'Уровень музыканта', attributeGroupId: 4 },
    { name: 'Тип строя', attributeGroupId: 4 },
    { name: 'Диаметр мундштука', attributeGroupId: 4 },
    { name: 'Тип мундштука', attributeGroupId: 4 },
    { name: 'Материал мундштука', attributeGroupId: 4 },
    { name: 'Тип клапанов', attributeGroupId: 4 },
    // Для ударных (attributeGroupId: 5)
    { name: 'Количество барабанов', attributeGroupId: 5 },
    { name: 'Материал корпуса барабанов', attributeGroupId: 5 },
    { name: 'Материал обечаек', attributeGroupId: 5 },
    { name: 'Тип обода', attributeGroupId: 5 },
    { name: 'Количество тарелок', attributeGroupId: 5 },
    { name: 'Материал тарелок', attributeGroupId: 5 },
    { name: 'Тип стойки', attributeGroupId: 5 },
    { name: 'Бренд педали', attributeGroupId: 5 },
    { name: 'Тип педали', attributeGroupId: 5 },
    { name: 'Покрытие корпуса', attributeGroupId: 5 },
    { name: 'Вес установки', attributeGroupId: 5 },
    { name: 'Размер бас-барабана', attributeGroupId: 5 },
    { name: 'Размер малого барабана', attributeGroupId: 5 },
    { name: 'Размер напольного тома', attributeGroupId: 5 },
    { name: 'Размер подвесного тома', attributeGroupId: 5 },
];

// Продукты
export const rawProducts = [
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
        availability:'Available'
    },
    {
        name: 'YAMAHA F310',
        description: 'YAMAHA F310 — отличная акустическая гитара для начинающих.' +
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
        colorId: 6,
        typeId: 2,
        availability:'Available'
    },
    {
        name: 'RODE NT1',
        description: 'RODE NT1 — профессиональный микрофон для записи вокала и инструментов.' +
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
        colorId: 2,
        typeId: 3,
        availability:'Available'
    },
    {
        name: 'FLIGHT NUT 310',
        description:
            'FLIGHT NUT 310 представляет собой тенор-укулеле. Дека укулеле изготавливается из сапеле. ' +
            'Кроме этого, в комплекте поставки находится чехол для хранения и транспортировки инструмента. ' +
            'Укулеле - это уменьшенный 4-струнный вариант привычной европейскому пользователю акустической гитары. ' +
            'В звучании укулеле преобладают высокие и средние частоты, благодаря которым инструмент звучит ярко, громко и четко ' +
            'и в помещении, и на улице. Кроме яркого и насыщенного звучания, укулеле является одним из лучших вариантов для поездок' +
            ', тур-походов и дорожных путешествий. Следует отметить, что компактная гавайская гитара укулеле, является' +
            ' национальным инструментом жителей гавайских островов.',
        price: 86.0,
        categoryId: 1,
        brandId: 4,
        colorId: 7,
        typeId: 4,
        availability:'On order'
    },
    {
        name: 'ROY BENSON SG-302',
        description: 'ROY BENSON SG-302 саксофон сопрано тональности си бемоль (Bb), студенческая модель' +
            ' от немецкого производителя Roy Benson. Это великолепный инструмент с красивым, богатым, насыщенным' +
            ' звуком и эффектным внешним видом. Он подойдет для музыкантов разного уровня мастерства, играющих в' +
            ' любых стилях музыки. Саксофон золотой, с блестящей лакированной отделкой. Изогнутая форма, более характерная' +
            ' для саксофонов альт, делает эту модель удобной для начинающих музыкантов, обучающихся игре на инструменте,' +
            ' в том числе для детей. Корпус и клапана выполнены из латуни. Верхний клапан - F# (фа диез). Пружины - из' +
            ' закаленной стали. Саксофон поставляется в легком футляре с прочной ручкой для переноски и заплечными ремнями,' +
            ' позволяющими носить его за спиной как рюкзак. В комплекте - мундштук, лигатура и колпачок, трость Gonzalez.' +
            ' ROY BENSON SG-302 прекрасное сочетание цены и качества.',
        price: 804.0,
        categoryId: 3,
        brandId: 5,
        colorId: 4,
        typeId: 6,
        availability:'On order'
    },
    {
        name: 'TAMA ST52H6C-SEM STAGESTAR',
        description: 'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.' +
            'TAMA ST52H6C-SEM STAGESTAR это ударная установка из 5-ти барабанов со стойками.',
        price: 1270.0,
        categoryId: 4,
        brandId: 6,
        colorId: 5,
        typeId: 5,
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
    { url: '/products/piano-2.png', productId: 1 },
    { url: '/products/piano-3.png', productId: 1 },
    { url: '/products/piano-1.png', productId: 1 },
    { url: '/products/piano-2.png', productId: 1 },
    { url: '/products/piano-3.png', productId: 1 },
    // Для продукта YAMAHA F310 (productId: 2)
    { url: '/products/guitar-1.png', productId: 2 },
    { url: '/products/guitar-2.png', productId: 2 },
    { url: '/products/guitar-3.png', productId: 2 },
    { url: '/products/guitar-4.png', productId: 2 },
    { url: '/products/guitar-5.png', productId: 2 },
    { url: '/products/guitar-6.png', productId: 2 },
    // Для продукта RODE NT1 (productId: 3)
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    { url: '/products/microphone-1.png', productId: 3 },
    // Для продукта FLIGHT NUT 310 (productId: 4)
    { url: '/products/ukulele-1.png', productId: 4 },
    { url: '/products/ukulele-2.png', productId: 4 },
    { url: '/products/ukulele-3.png', productId: 4 },
    { url: '/products/ukulele-1.png', productId: 4 },
    { url: '/products/ukulele-2.png', productId: 4 },
    { url: '/products/ukulele-3.png', productId: 4 },
    // Для продукта ROY BENSON SG-302 (productId: 5)
    { url: '/products/wind-1.png', productId: 5 },
    { url: '/products/wind-2.png', productId: 5 },
    { url: '/products/wind-1.png', productId: 5 },
    { url: '/products/wind-2.png', productId: 5 },
    // Для продукта TAMA ST52H6C-SEM STAGESTAR (productId: 6)
    { url: '/products/drums-1.png', productId: 6 },
    { url: '/products/drums-2.png', productId: 6 },
    { url: '/products/drums-3.png', productId: 6 },
    { url: '/products/drums-4.png', productId: 6 },
    { url: '/products/drums-5.png', productId: 6 },
    { url: '/products/drums-6.png', productId: 6 }
];

// Атрибуты продуктов
export const productAttributes = [
    // Для продукта ROLAND FP-30X-BK (productId: 1) — 15 атрибутов (группа Piano)
    { value: '88', productId: 1, attributeId: 1 },
    { value: 'молоточковая', productId: 1, attributeId: 2 },
    { value: 'нет', productId: 1, attributeId: 3 },
    { value: '15-24 Вт', productId: 1, attributeId: 4 },
    { value: 'да', productId: 1, attributeId: 5 },
    { value: 'да', productId: 1, attributeId: 6 },
    { value: 'да', productId: 1, attributeId: 7 },
    { value: 'нет', productId: 1, attributeId: 8 },
    { value: '—', productId: 1, attributeId: 9 },
    { value: '—', productId: 1, attributeId: 10 },
    { value: '—', productId: 1, attributeId: 11 },
    { value: '—', productId: 1, attributeId: 12 },
    { value: '—', productId: 1, attributeId: 13 },
    { value: '—', productId: 1, attributeId: 14 },
    { value: '—', productId: 1, attributeId: 15 },

    // Для продукта YAMAHA F310 (productId: 2) — 15 атрибутов (группа Guitar)
    { value: 'акустическая гитара', productId: 2, attributeId: 17 },
    { value: '6', productId: 2, attributeId: 18 },
    { value: '—', productId: 2, attributeId: 19 },
    { value: '—', productId: 2, attributeId: 20 },
    { value: '—', productId: 2, attributeId: 21 },
    { value: '—', productId: 2, attributeId: 22 },
    { value: '—', productId: 2, attributeId: 23 },
    { value: '—', productId: 2, attributeId: 24 },
    { value: '—', productId: 2, attributeId: 25 },
    { value: '—', productId: 2, attributeId: 26 },
    { value: '—', productId: 2, attributeId: 36 },
    { value: '—', productId: 2, attributeId: 37 },
    { value: '—', productId: 2, attributeId: 38 },
    { value: '—', productId: 2, attributeId: 39 },
    { value: '—', productId: 2, attributeId: 40 },

    // Для продукта RODE NT1 (productId: 3) — 15 атрибутов (группа Microphone)
    { value: 'конденсаторный микрофон', productId: 3, attributeId: 27 },
    { value: '—', productId: 3, attributeId: 28 },
    { value: '—', productId: 3, attributeId: 29 },
    { value: '—', productId: 3, attributeId: 30 },
    { value: '—', productId: 3, attributeId: 31 },
    { value: '—', productId: 3, attributeId: 32 },
    { value: '—', productId: 3, attributeId: 33 },
    { value: '—', productId: 3, attributeId: 34 },
    { value: '—', productId: 3, attributeId: 35 },
    { value: '—', productId: 3, attributeId: 43 },
    { value: '—', productId: 3, attributeId: 44 },
    { value: '—', productId: 3, attributeId: 45 },
    { value: '—', productId: 3, attributeId: 46 },
    { value: '—', productId: 3, attributeId: 47 },
    { value: '—', productId: 3, attributeId: 48 },

    // Для продукта FLIGHT NUT 310 (productId: 4) — 15 атрибутов (группа Wind)
    { value: 'укулеле', productId: 4, attributeId: 17 },
    { value: '4', productId: 4, attributeId: 18 },
    { value: 'сапеле', productId: 4, attributeId: 19 },
    { value: 'тенор', productId: 4, attributeId: 20 },
    { value: 'нет', productId: 4, attributeId: 21 },
    { value: 'чехол в комплекте', productId: 4, attributeId: 22 },
    { value: 'матовое покрытие', productId: 4, attributeId: 23 },
    { value: 'да', productId: 4, attributeId: 24 },
    { value: 'классическая форма', productId: 4, attributeId: 25 },
    { value: 'Гавайи', productId: 4, attributeId: 26 },
    { value: '—', productId: 4, attributeId: 36 },
    { value: '—', productId: 4, attributeId: 37 },
    { value: '—', productId: 4, attributeId: 38 },
    { value: '—', productId: 4, attributeId: 39 },
    { value: '—', productId: 4, attributeId: 40 },

    // ROY BENSON SG-302 (саксофон, productId: 5, Wind Specs → attributeGroupId: 4, новые атрибуты attributeId: 50–64)
    { value: 'саксофон сопрано', productId: 5, attributeId: 50 },
    { value: 'латунь', productId: 5, attributeId: 51 },
    { value: 'Bb (си бемоль)', productId: 5, attributeId: 52 },
    { value: 'латунь', productId: 5, attributeId: 53 },
    { value: 'золотое лаковое', productId: 5, attributeId: 54 },
    { value: 'мундштук, кейс, трость', productId: 5, attributeId: 55 },
    { value: '2.5 кг', productId: 5, attributeId: 56 },
    { value: '65 см', productId: 5, attributeId: 57 },
    { value: 'Германия', productId: 5, attributeId: 58 },
    { value: 'начальный / средний', productId: 5, attributeId: 59 },
    { value: 'темперированный', productId: 5, attributeId: 60 },
    { value: '18 мм', productId: 5, attributeId: 61 },
    { value: 'стандартный', productId: 5, attributeId: 62 },
    { value: 'пластик', productId: 5, attributeId: 63 },
    { value: 'механические', productId: 5, attributeId: 64 },

    // TAMA ST52H6C-SEM STAGESTAR (ударная установка, productId: 6, Drum Specs → attributeGroupId: 5, атрибуты attributeId: 65–79)
    { value: '5', productId: 6, attributeId: 65 },
    { value: 'фанера', productId: 6, attributeId: 66 },
    { value: 'металл', productId: 6, attributeId: 67 },
    { value: 'двойной', productId: 6, attributeId: 68 },
    { value: '3', productId: 6, attributeId: 69 },
    { value: 'бронза', productId: 6, attributeId: 70 },
    { value: 'хай-хэт, снэр, райд', productId: 6, attributeId: 71 },
    { value: 'Tama', productId: 6, attributeId: 72 },
    { value: 'одинарная цепная', productId: 6, attributeId: 73 },
    { value: 'глянцевое', productId: 6, attributeId: 74 },
    { value: '28 кг', productId: 6, attributeId: 75 },
    { value: '22"', productId: 6, attributeId: 76 },
    { value: '14"', productId: 6, attributeId: 77 },
    { value: '16"', productId: 6, attributeId: 78 },
    { value: '12"', productId: 6, attributeId: 79 },
];