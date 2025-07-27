// ProductDescription.tsx
"use client";

import React from "react";

interface ProductDescriptionProps {
    description: string;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    return (
        <section>
            <h2 className="text-xl tracking-widest font-medium mb-4">DESCRIPTION</h2>
            <p className="text-md text-muted-foreground leading-relaxed whitespace-pre-line">
                {description}
            </p>
        </section>
    );
};