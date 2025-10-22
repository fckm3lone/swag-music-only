// app/api/productPage/route.ts
import prisma from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {slug: string}}) {

    const product = prisma.product.findUnique(
        {
            where: {slug: params.slug},
            include: {
                images:true,
                attributes: {
                    include:{
                        attribute:true
                    }
                }
            }
        }
    )
    if (!product) return NextResponse.json(null, { status: 404 });

    // 👇 мапаем attributes → features
    return NextResponse.json({
        ...product,
        features: product.attributes,
    });
}
