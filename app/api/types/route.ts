// app/api/types/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {prisma, withRetry} from '@/prisma/prisma-client';

export async function GET(req: NextRequest) {
    try {
        const categoryId = req.nextUrl.searchParams.get('categoryId')
            ? Number(req.nextUrl.searchParams.get('categoryId'))
            : undefined;

        const types = await withRetry(()=>prisma.type.findMany({
            where: categoryId ? { categoryId } : {},
            select: {
                id: true,
                name: true,
            },
        }))

        return NextResponse.json(types, { status: 200 });
    } catch (error) {
        console.error('Error fetching types:', error);
        return NextResponse.json({ error: 'Failed to fetch types' }, { status: 500 });
    }
}