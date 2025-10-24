//components/product/product-gallery.tsx

"use client";

import Image from "next/image";
import {useRef, useState} from "react";
import {useMedia} from "react-use";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Skeleton} from "@/components/ui";
import {ProductPageType} from "@/services/products";


export function ProductImageGallery({
                                        images,
                                        isLoading,
                                    }: Partial<ProductPageType> & { isLoading?: boolean }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);


    const isDesktop = useMedia("(min-width: 600px)", true);
    const visibleImages = images?.slice(currentIndex, currentIndex + 4) ?? [];
    const canScrollUp = currentIndex > 0;
    const canScrollDown = currentIndex + 4 < (images?.length ?? 0);

    if (isLoading) {
        return (
            <div className="flex flex-row max-[600px]:flex-col items-center gap-4 ">
                <div className="flex flex-col items-center gap-5 max-[600px]:flex-row max-[600px]:overflow-x-auto max-[600px]:w-full ">
                    {Array(4)
                        .fill(0)
                        .map((_, i) => (
                            <Skeleton
                                key={i}
                                className="w-20 h-20 max-[600px]:min-w-20 rounded-s2"
                            />
                        ))}
                </div>
                <Skeleton className="
                flex justify-center items-center
    aspect-square shrink-0
    w-[580px]            /* десктоп */
    max-[1024px]:w-[480px]  /* планшет */
    max-[540px]:w-[420px]   /* маленький планшет */
    max-[480px]:w-[380px]   /* мобильный */
    max-[420px]:w-[320px]   /* мобильный */
    max-[360px]:w-[280px]   /* мобильный */
  " />
            </div>
        );
    }

    return (
        <div className="flex flex-row max-[600px]:flex-col items-center justify-center gap-10 max-[600px]:gap-4">
            {/* Миниатюры */}
            <div
                ref={scrollRef}
                className="flex flex-col items-center gap-5
                   max-[600px]:flex-row max-[600px]:overflow-x-auto
                   max-[600px]:w-full max-[600px]:gap-4 max-[600px]:justify-start"
            >
                {/* Стрелка вверх (только desktop) */}
                <button
                    disabled={!canScrollUp}
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    className="p-1 disabled:opacity-50 max-[600px]:hidden"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>

                {/* Desktop → slice(4), Mobile → все */}
                <div className="flex flex-col gap-5 max-[600px]:flex-row max-[600px]:gap-5">
                    {(isDesktop ? visibleImages : images ?? []).map(
                        (src, i) => (
                            <div
                                key={`${src.url}-${i}`}
                                className={`border rounded-s2 p-2 w-20 h-20 max-[600px]:min-w-20 max-[600px]:h-20 flex justify-center items-center cursor-pointer ${
                                    images?.indexOf(src) === selectedImageIndex
                                        ? "border-gray-200"
                                        : "border-border"
                                }`}
                                onClick={() => setSelectedImageIndex(images?.indexOf(src) ?? 0)}
                            >
                                <Image
                                    src={src.url}
                                    alt={`thumb-${i}`}
                                    width={80}
                                    height={80}
                                    style={{
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </div>
                        )
                    )}
                </div>

                {/* Стрелка вниз (только desktop) */}
                <button
                    disabled={!canScrollDown}
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    className="p-1 disabled:opacity-50 max-[600px]:hidden"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            {/* Главное изображение */}
            <div
                className="
    border rounded-s2 p-2
    flex justify-center items-center
    aspect-square shrink-0
    w-[580px]            /* десктоп */
    max-[1024px]:w-[480px]  /* планшет */
    max-[540px]:w-[420px]   /* маленький планшет */
    max-[480px]:w-[380px]   /* мобильный */
    max-[420px]:w-[320px]   /* мобильный */
    max-[360px]:w-[280px]   /* мобильный */
  "
                onClick={() => setLightboxOpen(true)}
            >
                <Image
                    src={images?.[selectedImageIndex]?.url ?? ""}
                    alt="main preview"
                    width={580}
                    height={580}
                    className="object-contain w-full h-full"
                />
            </div>
        </div>
    );
}