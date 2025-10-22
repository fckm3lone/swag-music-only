//services/attributes.ts

import { axiosInstance } from "@/services/axiosInstance";
import {ApiRoutes} from "@/services/constants";
import {Color} from "@prisma/client";

export async function getColors(): Promise<Color[]> {
    const { data } = await axiosInstance.get<Color[]>(
        ApiRoutes.GET_COLORS
    );
    return data;
}