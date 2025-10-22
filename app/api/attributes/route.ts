// app/api/attributes/route.ts
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const categoryId = req.nextUrl.searchParams.get("category_id");

    const groups = await prisma.attributeGroup.findMany({
        where: categoryId && categoryId !== "undefined"
            ? { categoryId: Number(categoryId) }
            : undefined,
        include: { attributes: true },
        orderBy: { name: "asc" },
    });

    return NextResponse.json(groups);
}
