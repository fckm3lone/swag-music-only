import {NextRequest, NextResponse} from "next/server";
import prisma, {withRetry} from "@/prisma/prisma-client";

// Получить список товаров
// app/api/products/route.ts

export async function GET(req: NextRequest) {
    try {
        const page = Number(req.nextUrl.searchParams.get('page')) || 1;
        const limit = Number(req.nextUrl.searchParams.get('limit')) || 10;
        const categoryId = req.nextUrl.searchParams.get('categoryId')
            ? Number(req.nextUrl.searchParams.get('categoryId'))
            : undefined;
        const priceFrom = req.nextUrl.searchParams.get('priceFrom')
            ? Number(req.nextUrl.searchParams.get('priceFrom'))
            : undefined;
        const priceTo = req.nextUrl.searchParams.get('priceTo')
            ? Number(req.nextUrl.searchParams.get('priceTo'))
            : undefined;
        const types = req.nextUrl.searchParams.get('types')
            ?.split(',')
            .filter((item) => item.trim() !== '') || undefined;
        const brands = req.nextUrl.searchParams.get('brands')
            ?.split(',')
            .filter((item) => item.trim() !== '') || undefined;
        const colors = req.nextUrl.searchParams.get('colors')
            ?.split(',')
            .filter((item) => item.trim() !== '') || undefined;
        const availability = req.nextUrl.searchParams.get('availability')
            ?.split(',')
            .filter((item) => item.trim() !== '') || undefined;

        console.log('API: Fetching products with params:', {
            page,
            limit,
            categoryId,
            priceFrom,
            priceTo,
            types,
            brands,
            colors,
            availability,
        });

        const where: any = {};

        if (categoryId) where.categoryId = categoryId;
        if (priceFrom) where.price = { gte: priceFrom };
        if (priceTo) where.price = { ...where.price, lte: priceTo };
        if (types && types.length > 0) where.type = { name: { in: types } };
        if (brands && brands.length > 0) where.brand = { name: { in: brands } };
        if (colors && colors.length > 0) where.color = { name: { in: colors } };
        if (availability && availability.length > 0) {
            where.availability = { in: availability };
        }

        const products = await withRetry(()=> prisma.product.findMany({
            where,
            take: limit,
            skip: (page - 1) * limit,
            include: {
                images: {
                    take: 1,
                    orderBy: { id: 'asc' },
                },
                type: true,
                brand: true,
                color: true,
            },
        }))

        // Преобразуем price из Decimal в number
        const serializedProducts = products.map((product) => ({
            ...product,
            price: Number(product.price), // Преобразуем Decimal в number
        }));

        const total = await prisma.product.count({ where });

        console.log('API: Products returned:', serializedProducts.length, 'Total:', total);
        return NextResponse.json({ products: serializedProducts, total }, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// Создать товар
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const product = await prisma.product.create({ data });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Ошибка при создании товара:", error);
        return NextResponse.json(
            { error: "Не удалось создать товар" },
            { status: 500 }
        );
    }
}
