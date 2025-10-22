// components/product/product-description.tsx
"use client";

import React from "react";
import {Skeleton} from "@/components/ui";

interface ProductDescriptionProps {
    description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps & { isLoading?: boolean }> = ({ description, isLoading }) => {
    if (isLoading) {
        return (
            <section className="w-full">
                <Skeleton className="h-6 w-1/6 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </section>
        );
    }

    return (
        <section className="w-full">
            <h2 className="text-xl tracking-widest font-medium mb-4 max-[767px]:text-lg">DESCRIPTION</h2>
            <p className="text-md text-muted-foreground leading-relaxed whitespace-pre-line max-[767px]:text-sm">
                {description}
            </p>
        </section>
    );
};