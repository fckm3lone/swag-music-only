import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/prisma-client";

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Ошибка при получении пользователей:", error);

        return NextResponse.json(
            { error: "Не удалось получить список пользователей" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    const user = await prisma.user.create({data })

    return NextResponse.json(user);
}
