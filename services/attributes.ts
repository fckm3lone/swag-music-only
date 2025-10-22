//services/attributes.ts

import { axiosInstance } from "@/services/axiosInstance";
import {ApiRoutes} from "@/services/constants";
import {AttributeGroup} from "@prisma/client";
import {AttributeGroupExtended} from "@/hooks/useCatalogFilters";




export async function getAttributes(categoryId?:number): Promise<AttributeGroupExtended[]> {
    const { data } = await axiosInstance.get<AttributeGroupExtended[]>(
        ApiRoutes.GET_ATTRIBUTES, {params: {category_id: categoryId}}
    );
    return data;
}