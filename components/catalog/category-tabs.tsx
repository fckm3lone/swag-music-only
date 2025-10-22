// components/catalog/category-tabs.tsx
'use client';

import {Button, Skeleton} from '@/components/ui';
import {useCatalogStore} from '@/store/catalogStore';
import {useQuery} from '@tanstack/react-query';
import {Api} from "@/services/api-client";
import React from "react";


type Category = {
    id: number;
    name: string;
};

const fetchCategories = async (): Promise<Category[]> => {
   try {
       return await Api.categories.getCategories();
   } catch (error) {
       console.error(error);
       throw new Error('Failed to fetch categories');
   }


};

export const CategoryTabs = () => {
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const activeCategory = useCatalogStore((s) => s.activeCategory);
    const setActiveCategory = useCatalogStore((s) => s.setActiveCategory);
    const showAllCategories = useCatalogStore((s) => s.showAllCategories);
    const toggleShowAllCategories = useCatalogStore((s) => s.toggleShowAllCategories);

    const visibleCategories = categories.slice(0, 4);
    const hiddenCategories = categories.slice(4);

    if (isLoading) {
        return <Skeleton className='bg-card w-100 h-10 rounded-s2' />;
    }

    return (
        <div className="flex gap-2 flex-wrap">
            <Button
                variant={activeCategory === undefined ? 'category_active' : 'category_default'}
                onClick={() => setActiveCategory(undefined)}
                className="rounded-s2"
            >
                All
            </Button>
            {visibleCategories.map((cat) => (
                <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? 'category_active' : 'category_default'}
                    onClick={() => setActiveCategory(cat.id)}
                    className="rounded-s2"
                >
                    {cat.name}
                </Button>
            ))}
            {hiddenCategories.length > 0 && (
                <Button
                    variant="category_default"
                    onClick={toggleShowAllCategories}
                    className="rounded-s2 font-regular"
                >
                    {showAllCategories ? '←' : '→'}
                </Button>
            )}
            {showAllCategories &&
                hiddenCategories.map((cat) => (
                    <Button
                        key={cat.id}
                        variant={activeCategory === cat.id ? 'category_active' : 'category_default'}
                        onClick={() => setActiveCategory(cat.id)}
                        className="rounded-s2"
                    >
                        {cat.name}
                    </Button>
                ))}
        </div>
    );
};