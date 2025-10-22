// app/api/products/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
    try {
        const q = (req.nextUrl.searchParams.get("query") || "").trim();
        if (!q) return NextResponse.json([], { status: 200 });

        const products = await prisma.product.findMany({
            where: { name: { contains: q, mode: "insensitive" } },
            include: { images: true },
            take: 5,
        });

        return NextResponse.json(products);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }
}
