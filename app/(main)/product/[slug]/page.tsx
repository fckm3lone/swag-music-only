// app/product/[slug]/page.tsx

import { Container, PageTitle } from "@/components/shared";
import { ProductImageGallery } from "@/components/product/product-gallery";
import { ProductFeaturesPreview } from "@/components/product/product-features-preview";
import { ProductPriceBlock } from "@/components/product/product-price-block";
import { ProductDescription } from "@/components/product/product-description";
import { ProductAllFeatures } from "@/components/product/product-all-features";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import { getProductBySlug, ProductPageType } from "@/services/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Товар не найден" };

    return {
        title: `${product.name} - Музыкальный магазин`,
        description: product.description?.slice(0, 160) || "",
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const product: ProductPageType | null = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const {id, name, price, images, features, description } = product;

    return (
        <Container>
            <PageTitle title={name} />
            <div className="max-[1520px]:px-5">
            <div className="flex gap-20 mt-10 max-[1095px]:gap-10 max-[876px]:flex-col">
                <ProductImageGallery images={images} />
                <div className="flex flex-col w-[320px] max-[876px]:w-full">
                    <ProductFeaturesPreview features={features.slice(0, 8)} />
                    <ProductPriceBlock price={Number(price)} id={id} />
                </div>
            </div>
            <div className="mt-20">
                <ProductDescription description={description} />
            </div>
            <div className="mt-12">
                <ProductAllFeatures features={features} />
            </div>
        </div>
        </Container>
    );
}
