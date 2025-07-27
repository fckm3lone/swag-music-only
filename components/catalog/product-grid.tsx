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
            <div className="flex flex-wrap gap-9.5">
                {products.map((product) => (
                    <div key={product.id} className="flex-grow-0 flex-shrink-0 basis-[190px]">
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>
        </Suspense>
    );
}