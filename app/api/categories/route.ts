// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import {prisma, withRetry} from '@/prisma/prisma-client';

export async function GET() {
    try {
        const categories = await withRetry(()=>prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
        }))
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}