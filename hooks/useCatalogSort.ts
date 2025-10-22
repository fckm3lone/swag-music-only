// hooks/useCatalogSort.ts
import {useMemo} from "react";
import {ProductWithImages} from "@/types/product";

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | null;

export function useCatalogSort(products: ProductWithImages[] = [], sort: string | null = null) {
    const sortedProducts = useMemo(() => {
        if (!sort) return products;

        const sorted = [...products];
        switch (sort) {
            case "price-asc":
                sorted.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case "price-desc":
                sorted.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case "name-asc":
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        return sorted;
    }, [products, sort]);

    return { sortedProducts };
}