import { Container, PageTitle } from "@/components/shared";
import { ProductImageGallery } from "@/components/product/product-gallery";
import { ProductFeaturesPreview } from "@/components/product/product-features-preview";
import { ProductPriceBlock } from "@/components/product/product-price-block";
import { ProductDescription } from "@/components/product/product-description";
import { ProductAllFeatures } from "@/components/product/product-all-features";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import { Metadata } from "next";
import { mockProducts } from "@/mock-products";

async function fetchProductBySlug(slug: string): Promise<Product | null> {
    console.log("Fetching product with slug:", slug);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const product = mockProducts.find((p) => p.slug === slug);
    console.log("Found product:", product ? product : "Not found");
    return product || null;
}

export async function generateStaticParams() {
    const slugs = mockProducts.map((product) => ({
        slug: product.slug,
    }));
    console.log("Generated slugs for SSG:", JSON.stringify(slugs, null, 2));
    return slugs;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const product = await fetchProductBySlug(params.slug);
    if (!product) return { title: "Товар не найден" };
    return {
        title: `${product.name} - Музыкальный магазин`,
        description: product.description.slice(0, 160),
    };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await fetchProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    const { name, price, images, features, description } = product;

    return (
        <Container>
            <PageTitle title={name} />
            <div className="flex gap-20 mt-10">
                <ProductImageGallery images={images} />
                <div className="flex flex-col w-[320px]">
                    <ProductFeaturesPreview features={features.slice(0, 8)} />
                    <ProductPriceBlock price={price} />
                </div>
            </div>
            <div className="mt-20">
                <ProductDescription description={description} />
            </div>
            <div className="mt-12">
                <ProductAllFeatures features={features} />
            </div>
        </Container>
    );
}