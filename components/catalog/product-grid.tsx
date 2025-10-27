// components/catalog/product-grid.tsx
'use client';

import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {ProductCard} from './product-card';
import {Button, Skeleton} from '@/components/ui';
import {useCatalogStore} from '@/store/catalogStore';
import {ProductWithImages} from '@/types/product';
import {useCatalogSort} from '@/hooks/useCatalogSort';

type ProductGridProps = {
    sort: string | null;
};

export function ProductGrid({ sort }: ProductGridProps) {
    const [page, setPage] = useState(1);
    const activeCategory = useCatalogStore((s) => s.activeCategory);
    const priceFrom = useCatalogStore((s) => s.priceFrom);
    const priceTo = useCatalogStore((s) => s.priceTo);
    const checkedItems = useCatalogStore((s) => s.checkedItems);

    const { data, isLoading, isError, error } = useQuery<{
        products: ProductWithImages[];
        total: number;
    }>({
        queryKey: ['products', page, activeCategory, priceFrom, priceTo, checkedItems],
        queryFn: async () => {
            const types = checkedItems['Types'] || [];
            const brands = checkedItems['Brands'] || [];
            const colors = checkedItems['Colors'] || [];
            const availability = checkedItems['Available'] || [];

            console.log('Fetching products with params:', {
                page,
                categoryId: activeCategory,
                priceFrom,
                priceTo,
                types,
                brands,
                colors,
                availability,
            });

            return fetch(`/api/products?` + new URLSearchParams({
                page: String(page),
                limit: '10',
                categoryId: activeCategory?.toString() ?? '',
                priceFrom: priceFrom ?? '',
                priceTo: priceTo ?? '',
                types: (checkedItems['Types'] ?? []).join(','),
                brands: (checkedItems['Brands'] ?? []).join(','),
                colors: (checkedItems['Colors'] ?? []).join(','),
                availability: (checkedItems['Available'] ?? []).join(','),
            })).then(res => res.json());
        },
        placeholderData: keepPreviousData,
        staleTime: 30 * 1000,
    });

    const products = data?.products ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / 10);

    // применяем сортировку
    const { sortedProducts } = useCatalogSort(products, sort);

    return (
        <div>
            {isError && (
                <div className="text-red-500 text-center">
                    Ошибка: {error?.message || 'Не удалось загрузить продукты'}
                </div>
            )}

            <div
                className="grid  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 w-full max-w-full
        max-[870px]:grid-cols-2 max-[1090px]:grid-cols-3 max-[767px]:justify-items-center-safe max-[787px]:mx-auto max-[425px]:px-2  max-[500px]:px-4"
            >
                {isLoading ? (
                    Array(10)
                        .fill(0)
                        .map((_, index) => (
                            <div key={index} className="flex flex-col gap-4">
                                <Skeleton className="h-48 w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                ) : (
                    <>
                        {sortedProducts.length === 0 && (
                            <div className="text-center text-gray-500 col-span-full">
                                Нет продуктов по заданным фильтрам
                            </div>
                        )}

                        {sortedProducts.map((product: ProductWithImages) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={Number(product.price)}
                                images={product.images}
                                slug={product.slug}
                            />
                        ))}
                    </>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        disabled={page === 1 || isLoading}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Предыдущая
                    </Button>
                    <span className="self-center">
            Страница {page} из {totalPages}
          </span>
                    <Button
                        variant="outline"
                        disabled={page === totalPages || isLoading}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Следующая
                    </Button>
                </div>
            )}
        </div>
    );
}