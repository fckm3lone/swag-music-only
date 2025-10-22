// services/types.ts
import { axiosInstance } from '@/services/axiosInstance';
import { ApiRoutes } from '@/services/constants';
import { Type } from '@prisma/client';

export async function getTypes(categoryId?: number): Promise<Type[]> {
    const { data } = await axiosInstance.get<Type[]>(ApiRoutes.GET_TYPES, {
        params: { categoryId }, // Изменено с category_id на categoryId
    });
    console.log('Requesting types with params:', { categoryId });
    return data;
}