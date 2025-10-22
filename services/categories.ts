//services/attributes.ts

import { axiosInstance } from "@/services/axiosInstance";
import {ApiRoutes} from "@/services/constants";
import {Category} from "@prisma/client";

export async function getCategories(): Promise<Category[]> {
    const { data } = await axiosInstance.get<Category[]>(
        ApiRoutes.GET_CATEGORIES
    );
    return data;
}