import {axiosInstance} from "@/services/axiosInstance";
import {ProductSearchItem, ProductWithImages} from "@/types/product";
import {ApiRoutes} from "@/services/constants";


import {
    Attribute,
    Product,
    ProductAttribute,
    ProductImage
} from "@prisma/client";
import prisma from "@/prisma/prisma-client";

export async function search(query: string): Promise<ProductSearchItem[]> {
    const { data } = await axiosInstance.get<ProductSearchItem[]>(
        ApiRoutes.SEARCH_PRODUCTS,
        { params: { query } }
    );
    return data;
}

export async function getProductBySlug(slug: string): Promise<ProductPageType | null> {
    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            images: true,
            attributes: { include: { attribute: true } },
        },
    });

    if (!product) return null;

    return {
        ...product,
        features: product.attributes,
    };
}

export type ProductPageType = Product & {
    images?: ProductImage[],
    features?: (ProductAttribute & {
        attribute: Attribute
    })[]
}

  export  async function getProducts(params: {
    page?: number;
    limit?: number;
    categoryId?: number;
    priceFrom?: string;
    priceTo?: string;
    types?: string[];
    brands?: string[];
    colors?: string[];
    availability?: string[];
}): Promise<{ products: ProductWithImages[]; total: number }> {
    const { data } = await axiosInstance.get<{ products: ProductWithImages[]; total: number }>(
        ApiRoutes.GET_PRODUCTS,
        {
            params: {
                page: params.page || 1,
                limit: params.limit || 10,
                categoryId: params.categoryId,
                priceFrom: params.priceFrom,
                priceTo: params.priceTo,
                types: params.types?.join(','),
                brands: params.brands?.join(','),
                colors: params.colors?.join(','),
                availability: params.availability?.join(','),
            },
        }
    );
    console.log('Client: Products received:', data.products.length, 'Total:', data.total);
    return data;
}
