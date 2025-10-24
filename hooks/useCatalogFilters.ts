// hooks/useCatalogFilters.ts
import {useQuery} from "@tanstack/react-query";
import {PublicAttribute, PublicAttributeGroup} from "@/types/public";


// убран Api, используется fetch

type AttributeGroupUI = {
    title: string;
    items: string[];
};

export type AttributeGroupExtended = PublicAttributeGroup & {
    attributes: PublicAttribute[];
}

type PrivateType = {
    id: number;
    name: string;
};

type PrivateBrand = {
    id: number;
    name: string;
};

type PrivateColor = {
    id: number;
    name: string;
};

export function useCatalogFilters(categoryId?: number) {
    const { data: brands, isLoading: loadingBrands } = useQuery<PrivateBrand[]>({
        queryKey: ["brands"],
        queryFn: async () => {
            const res = await fetch("/api/brands");
            if (!res.ok) throw new Error("Failed to fetch brands");
            return res.json();
        },
    });

    const { data: colors, isLoading: loadingColors } = useQuery<PrivateColor[]>({
        queryKey: ["colors"],
        queryFn: async () => {
            const res = await fetch("/api/colors");
            if (!res.ok) throw new Error("Failed to fetch colors");
            return res.json();
        },
    });

    const { data: types, isLoading: loadingTypes } = useQuery<PrivateType[]>({
        queryKey: ['types', categoryId],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (categoryId) params.append('categoryId', String(categoryId));
            const res = await fetch(`/api/types?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch types");
            return res.json();
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
