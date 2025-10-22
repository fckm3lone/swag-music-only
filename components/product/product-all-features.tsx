// components/product/product-all-features.tsx
"use client";

import React from "react";
import {ProductPageType} from "@/services/products";
import {Skeleton} from "@/components/ui";


interface Feature {
    label: string;
    value: string;
}

interface ProductAllFeaturesProps {
    features: Feature[];
}
export const ProductAllFeatures: React.FC<ProductPageType & { isLoading?: boolean }> = ({ features, isLoading }) => {
    if (isLoading) {
        return (
            <section id="all-features" className="w-full">
                <Skeleton className="h-6 w-1/6 mb-4" />
                <div className="grid grid-cols-1 laptop:grid-cols-2 gap-y-2 gap-x-8">
                    {Array(8).fill(0).map((_, i) => (
                        <div key={i} className="flex justify-between pb-1">
                            <Skeleton className="h-4 w-full" />

                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id="all-features" className="w-full">
            <h2 className="text-xl font-medium tracking-widest mb-4 max-[767px]:text-lg">ALL FEATURES</h2>
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-y-2 gap-x-8 max-[767px]:gap-x-4">
                {features.map((feature) => (
                    <div key={feature.attribute.name} className="flex justify-between border-b pb-1 text-sm max-[767px]:text-xs">
                        <span className="text-muted-foreground">{feature.attribute.name}</span>
                        <span className="text-right font-medium text-foreground truncate max-w-[200px] max-[767px]:max-w-[150px]">
                            {feature.value}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};
