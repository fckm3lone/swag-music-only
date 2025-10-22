// hooks/useCatalogFilters.ts
import { useQuery } from "@tanstack/react-query";

import {Brand, Color, Type, AttributeGroup, Attribute} from "@prisma/client";
import {Api} from "@/services/api-client";

type AttributeGroupUI = {
    title: string;
    items: string[];
};

export type AttributeGroupExtended = AttributeGroup & {
    attributes: Attribute[];
}

export function useCatalogFilters(categoryId?: number) {
    const { data: brands, isLoading: loadingBrands } = useQuery<Brand[]>({
        queryKey: ["brands"],
        queryFn: Api.brands.getBrands,
    });

    const { data: colors, isLoading: loadingColors } = useQuery<Color[]>({
        queryKey: ["colors"],
        queryFn: Api.colors.getColors,
    });

    const { data: types, isLoading: loadingTypes } = useQuery<Type[]>({
        queryKey: ['types', categoryId],
        queryFn: async () => {
            console.log('Fetching types for categoryId:', categoryId);
            const result = await Api.types.getTypes(categoryId);
            console.log('Types received:', result);
            return result;
        },
    });
    // const { data: attributes, isLoading: loadingAttributes } = useQuery<AttributeGroupExtended[]>({
    //     queryKey: ["attributes", categoryId],
    //     queryFn: () => Api.attributes.getAttributes(categoryId),
    // });

    const isLoading = loadingBrands || loadingColors || loadingTypes
        // || loadingAttributes;

    // собираем в единый массив
    const attributeGroups: AttributeGroupUI[] = [
        {
            title: "Brands",
            items: brands?.map((b) => b.name) ?? [],
        },
        {
            title: "Types",
            items: types?.map((t) => t.name) ?? [],
        },
        {
            title: "Colors",
            items: colors?.map((c) => c.name) ?? [],
        },
        // {
        //     title: "Attributes",
        //     items:
        //         attributes?.flatMap((group) =>
        //             group.attributes.map((a) => `${group.name}: ${a.name}`)
        //         ) ?? [],
        // },
    ];

    return { attributeGroups, isLoading };
}
