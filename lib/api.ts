// app/api/products/route.ts
import { NextResponse } from "next/server";
import { Product } from "@/types/product";

// Пример базы данных (замените на реальную)
const products: Product[] = [
    {
        id: 1,
        name: "ROLAND FP-30X-BK",
        slug: "roland-fp-30x-bk",
        price: 850.00,
        image: "/products/piano-1.png",
        images: ["/products/piano-1.png", "/products/guitar-1.png"],
        features: [{ label: "Количество клавиш", value: "88" }],
        description: "ROLAND FP-30X-BK — это высококачественное цифровое пианино...",
    },
    {
        id: 2,
        name: "YAMAHA F310",
        slug: "yamaha-f310",
        price: 210.00,
        image: "/products/guitar-1.png",
        images: ["/products/guitar-1.png", "/products/piano-1.png"],
        features: [{ label: "Количество клавиш", value: "88" }],
        description: "ROLAND FP-30X-BK — это высококачественное цифровое пианино...",
    },
    {
        id: 3,
        name: "RODE NT1",
        slug: "rode-nt1",
        price: 350.00,
        image: "/products/microphone-1.png",
        images: ["/products/microphone-1.png", "/products/guitar-1.png"],
        features: [{ label: "Количество клавиш", value: "88" }],
        description: "ROLAND FP-30X-BK — это высококачественное цифровое пианино...",
    },

];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (slug) {
        const product = products.find((p) => p.slug === slug);
        return product
            ? NextResponse.json(product)
            : NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const start = (page - 1) * limit;
    const paginatedProducts = products.slice(start, start + limit);
    return NextResponse.json(paginatedProducts);
}