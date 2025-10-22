import prisma, {withRetry} from "@/prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET() {

    const brands = await withRetry(()=>prisma.brand.findMany())

    return NextResponse.json(brands)
}