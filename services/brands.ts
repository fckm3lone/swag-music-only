//services/attributes.ts

import { axiosInstance } from "@/services/axiosInstance";
import {ApiRoutes} from "@/services/constants";
import {Brand} from "@prisma/client";

export async function getBrands(): Promise<Brand[]> {
    const { data } = await axiosInstance.get<Brand[]>(
        ApiRoutes.GET_BRANDS
    );
    return data;
}