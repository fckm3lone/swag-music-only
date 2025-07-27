// ProductAllFeatures.tsx
"use client";

import React from "react";

interface Feature {
    label: string;
    value: string;
}

interface ProductAllFeaturesProps {
    features: Feature[];
}

export const ProductAllFeatures: React.FC<ProductAllFeaturesProps> = ({ features }) => {
    return (
        <section id="all-features">
            <h2 className="text-xl font-medium tracking-widest mb-4">ALL FEATURES</h2>
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-y-2 gap-x-8">
                {features.map((feature) => (
                    <div key={feature.label} className="flex justify-between border-b pb-1 text-sm">
                        <span className="text-muted-foreground">{feature.label}</span>
                        <span className="text-right font-medium text-foreground truncate max-w-[200px]">
              {feature.value}
            </span>
                    </div>
                ))}
            </div>
        </section>
    );
};
