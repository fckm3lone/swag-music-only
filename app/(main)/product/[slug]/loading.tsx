// app/product/[slug]/loading.tsx

import {Container, PageTitle} from "@/components/shared";
import { ProductImageGallery } from "@/components/product/product-gallery";
import { ProductFeaturesPreview } from "@/components/product/product-features-preview";
import { ProductPriceBlock } from "@/components/product/product-price-block";
import { ProductDescription } from "@/components/product/product-description";
import { ProductAllFeatures } from "@/components/product/product-all-features";
import { Skeleton } from "@/components/ui";

export default function Loading() {
    return (
        <Container>
            {/* Скелетон для PageTitle: предполагаем, что это заголовок страницы, делаем скелетон подходящего размера */}
            <PageTitle title="Loading..." />

            <div className="max-[1520px]:px-5">
                <div className="flex gap-20 mt-10 max-[1095px]:gap-10 max-[876px]:flex-col">
                    {/* Скелетон галереи изображений */}
                    <ProductImageGallery images={[]} isLoading={true} />

                    <div className="flex flex-col w-[320px] max-[876px]:w-full">
                        {/* Скелетон превью фич */}
                        <ProductFeaturesPreview features={[]} isLoading={true} />

                        {/* Скелетон блока цены */}
                        <ProductPriceBlock price={0} isLoading={true}  />
                    </div>
                </div>

                <div className="mt-20">
                    {/* Скелетон описания */}
                    <ProductDescription description="" isLoading={true} />
                </div>

                <div className="mt-12">
                    {/* Скелетон всех фич */}
                    <ProductAllFeatures features={[]} isLoading={true} />
                </div>
            </div>
        </Container>
    );
}