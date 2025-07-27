// components/product/product-gallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ProductImageGalleryProps {
    images: string[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0); // Для карусели
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Для большого изображения
    const visibleImages = images.slice(currentIndex, currentIndex + 4);

    const canScrollUp = currentIndex > 0;
    const canScrollDown = currentIndex + 4 < images.length;

    return (
        <div className="flex items-center gap-10">
            <div className="flex flex-col items-center gap-5">
                <button
                    disabled={!canScrollUp}
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    className="p-1 disabled:opacity-50"
                    aria-label="Scroll up images"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>

                {visibleImages.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        className="border rounded-s2 p-2 max-w-30 max-h-30 w-30 h-30 flex justify-center items-center cursor-pointer"
                    >
                        <Image
                            src={src}
                            alt={`thumb-${i}`}
                            width={100}
                            height={100}
                            style={{
                                objectFit: "contain",
                                maxWidth: "6rem",
                                maxHeight: "6rem",
                                width: "100%",
                                height: "100%",
                            }}
                            onClick={() => setSelectedImageIndex(images.indexOf(src))} // Меняем только большое изображение
                        />
                    </div>
                ))}

                <button
                    disabled={!canScrollDown}
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    className="p-1 disabled:opacity-50"
                    aria-label="Scroll down images"
                >
                    <ChevronDown className="w-6 h-6" />
                </button>
            </div>

            <div className="border rounded-s2 p-2 max-w-160 max-h-160 w-160 h-160 flex justify-center items-center">
                <Image
                    src={images[selectedImageIndex]} // Используем selectedImageIndex
                    alt="main preview"
                    width={580}
                    height={580}
                    style={{
                        objectFit: "contain",
                        maxWidth: "580px",
                        maxHeight: "580px",
                    }}
                />
            </div>
        </div>
    );
}