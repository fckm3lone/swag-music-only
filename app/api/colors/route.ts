import prisma, {withRetry} from "@/prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET() {
    const colors = await withRetry(()=>prisma.color.findMany())

    return NextResponse.json(colors);
}