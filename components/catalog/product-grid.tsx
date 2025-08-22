import { ProductCard } from "./product-card";
import { Suspense } from "react";
import { Product } from "@/types/product";
import { mockProducts } from "@/mock-products";

// Функция для получения mock-данных (заменится на fetch позже)
async function fetchProducts(page: number = 1, limit: number = 10): Promise<Product[]> {
    // Имитация задержки API для реалистичности
    await new Promise((resolve) => setTimeout(resolve, 500));

    const start = (page - 1) * limit;
    return mockProducts.slice(start, start + limit);
}

export async function ProductGrid() {
    const products: Product[] = await fetchProducts();

    return (
        <Suspense fallback={<div>Загрузка товаров...</div>}>
            <div
                className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 w-full max-w-full
                max-[870px]:grid-cols-2 max-[1090px]:grid-cols-3 max-[767px]:justify-items-center-safe max-[787px]:mx-auto max-[400px]:px-0 max-[400px]:grid-cols-1 max-[500px]:px-3"
            >
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </Suspense>
    );
}