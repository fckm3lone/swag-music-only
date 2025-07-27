import { Product } from "@/types/product";

export const mockProducts: Product[] = [
    {
        id: 1,
        name: "ROLAND FP-30X-BK",
        slug: "roland-fp-30x-bk",
        price: 850.00,
        image: "/products/piano-1.png",
        images: ["/products/piano-1.png", "/products/microphone-1.png", "/products/piano-1.png", "/products/microphone-1.png", "/products/guitar-1.png", "/products/piano-1.png",],
        features: [
            { label: "Количество клавиш", value: "88" },
            { label: "Тип клавиатуры", value: "молоточковая" },
            { label: "Дисплей", value: "нет" },
            { label: "Суммарная мощность акустики", value: "15-24 Вт" },
            { label: "Адаптер в комплекте", value: "да" },
            { label: "Линейный выход", value: "да" },
            { label: "USB", value: "да" },
            { label: "Стойка в комплекте", value: "нет" },
            { label: "Количество клавиш 2", value: "88" },
            { label: "Тип клавиатуры 2", value: "молоточковая" },
            { label: "Дисплей 2", value: "нет" },
            { label: "Суммарная мощность акустики 2", value: "15-24 Вт" },
            { label: "Адаптер в комплекте 2", value: "да" },
            { label: "Линейный выход 2", value: "да" },
            { label: "USB 2", value: "да" },
            { label: "Стойка в комплекте 2", value: "нет" },
            { label: "Количество клавиш", value: "88" },
            { label: "Тип клавиатуры", value: "молоточковая" },
            { label: "Дисплей", value: "нет" },
            { label: "Суммарная мощность акустики", value: "15-24 Вт" },
            { label: "Адаптер в комплекте", value: "да" },
            { label: "Линейный выход", value: "да" },
            { label: "USB", value: "да" },
            { label: "Стойка в комплекте", value: "нет" },
            { label: "Количество клавиш 2", value: "88" },
            { label: "Тип клавиатуры 2", value: "молоточковая" },
            { label: "Дисплей 2", value: "нет" },
            { label: "Суммарная мощность акустики 2", value: "15-24 Вт" },
            { label: "Адаптер в комплекте 2", value: "да" },
            { label: "Линейный выход 2", value: "да" },
            { label: "USB 2", value: "да" },
            { label: "Стойка в комплекте 2", value: "нет" }
        ],
        description: "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n" +
            "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n" +
            "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n" +
            "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n" +
            "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n" +
            "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n" +
            "ROLANDE FP-30X-BK — это высококачественное цифровое пианино, идеально подходящее для начинающих и профессиональных музыкантов.\n",
    },
    {
        id: 2,
        name: "YAMAHA F310",
        slug: "yamaha-f310",
        price: 210.00,
        image: "/products/guitar-1.png",
        images: ["/products/guitar-1.png", "/products/guitar-1.png", "/products/piano-1.png", "/products/microphone-1.png" ],
        features: [
            { label: "Тип", value: "акустическая гитара" },
            { label: "Количество струн", value: "6" },
        ],
        description: "YAMAHA F310 — отличная акустическая гитара для начинающих.",
    },
    {
        id: 3,
        name: "RODE NT1",
        slug: "rode-nt1",
        price: 350.00,
        image: "/products/microphone-1.png",
        images: ["/products/microphone-1.png", "/products/piano-1.png", "/products/microphone-1.png", "/products/piano-1.png", "/products/microphone-1.png"],
        features: [{ label: "Тип", value: "конденсаторный микрофон" }],
        description: "RODE NT1 — профессиональный микрофон для записи вокала и инструментов.",
    },
    // Добавьте другие товары по необходимости
];