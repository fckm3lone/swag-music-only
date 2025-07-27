"use client"

import { Button } from "@/components/ui";
import { FC } from "react";

type Feature = {
    label: string;
    value: string;
};

interface ProductFeaturesPreviewProps {
    features: Feature[];
    onMoreClick?: () => void; // если нужно вручную обработать клик
}

export const ProductFeaturesPreview: FC<ProductFeaturesPreviewProps> = ({ features, onMoreClick }) => {
    const displayed = features.slice(0, 8);

    const scrollToFullFeatures = () => {
        const section = document.getElementById("all-features");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div>
            <h3 className="font-medium text-xl mb-5 tracking-widest">Features</h3>
            <ul className="text-md space-y-1.5 mb-4">
                {displayed.map((f, i) => (
                    <li key={i}>
                        <span className="text-foreground">{f.label}:</span>{" "}
                        <span
                            className={`${
                                f.value === "нет" ? "text-secondary" : "text-secondary"
                            }`}
                        >
              {f.value}
            </span>
                    </li>
                ))}
            </ul>

            {/* троеточие-кнопка */}
            {features.length > 6 && (
                <Button
                    variant="link"
                    onClick={onMoreClick || scrollToFullFeatures}
                    className="text-lg px-0 py-0 w-auto h-auto font-thin tracking-wide text-foreground"
                >
                    ...
                </Button>
            )}
        </div>
    );
};
