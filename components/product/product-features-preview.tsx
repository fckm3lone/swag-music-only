// components/product/product-features-preview.tsx
"use client"

import { Button, Skeleton } from "@/components/ui";
import { FC } from "react";
import { ProductPageType } from "@/services/products";

export const ProductFeaturesPreview: FC<ProductPageType & { isLoading?: boolean }> = ({ features, isLoading }) => {
    const displayed = features.slice(0, 8);

    const scrollToFullFeatures = () => {
        const section = document.getElementById("all-features");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (isLoading) {
        return (
            <div className="w-full">
                <Skeleton className="h-6 w-1/2 mb-5" /> {/* Заголовок "Features" */}
                <ul className="text-md space-y-3 mb-6 max-[767px]:text-sm">
                    {Array(8).fill(0).map((_, i) => (
                        <li key={i}>
                            <Skeleton className="h-4 w-full" /> {/* Одна цельная строка для пары ключ-значение */}
                        </li>
                    ))}
                </ul>
                <Skeleton className="h-4 w-10 mt-6" /> {/* Кнопка "..." */}
            </div>
        );
    }

    return (
        <div className="w-full">
            <h3 className="font-medium text-xl mb-5 tracking-widest">Features</h3>
            <ul className="text-md space-y-1.5 mb-4 max-[767px]:text-sm">
                {displayed.map((f, i) => (
                    <li key={i}>
                        <span className="text-foreground">{f.attribute.name}:</span>{" "}
                        <span className={f.value === "нет" ? "text-secondary" : "text-secondary"}>
                            {f.value}
                        </span>
                    </li>
                ))}
            </ul>
            {features.length > 6 && (
                <Button
                    variant="link"
                    onClick={scrollToFullFeatures}
                    className="text-lg px-0 py-0 w-auto h-auto font-thin tracking-wide text-foreground"
                >
                    ...
                </Button>
            )}
        </div>
    );
};