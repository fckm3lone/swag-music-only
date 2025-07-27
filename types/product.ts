// types/product.ts
export interface ProductFeature {
    label: string;
    value: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number; // Используем string для отображения цены (например, "850.00")
    image: string;
    images: string[]; // Для галереи на странице товара
    features: ProductFeature[];
    description: string;
}