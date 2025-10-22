// types/product.ts
import { Prisma, Product } from "@prisma/client";

import Decimal = decimal.Decimal;


export type ProductSearchItem = Prisma.ProductGetPayload<{
    include: { images: true };
}>;

export type DecimalJS = Decimal

export type ProductWithImages = Product & {
    images: { url: string }[];
    type?: { name: string }; // Опционально
    brand?: { name: string }; // Опционально
    color?: { name: string }; // Опционально
    // price: DecimalJS; // Decimal из decimal.js
};