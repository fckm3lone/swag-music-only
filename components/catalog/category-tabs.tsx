"use client";

import { Button } from "@/components/ui";
import { useState } from "react";

const allCategories = ["All", "String", "Keyboard", "Wind", "Percussion", "Drums", "Synth", "Bass"];

export const CategoryTabs = () => {
    const [active, setActive] = useState("All");
    const [showAll, setShowAll] = useState(false);

    // Первые 5 категорий
    const visibleCategories = allCategories.slice(0, 5);

    // Остальные категории
    const hiddenCategories = allCategories.slice(5);

    return (
        <div className="flex gap-2 flex-wrap">
            {/* Всегда показываем первые 5 */}
            {visibleCategories.map((cat) => (
                <Button
                    key={cat}
                    variant={active === cat ? "category_active" : "category_default"}
                    onClick={() => setActive(cat)}
                    className="rounded-s2"
                >
                    {cat}
                </Button>
            ))}

            {/* Кнопка More / Less */}
            {hiddenCategories.length > 0 && (
                <Button
                    variant="category_default"
                    onClick={() => setShowAll(!showAll)}
                    className="rounded-s2 font-regular"
                >
                    {showAll ? "←" : "→"}
                </Button>
            )}

            {/* Скрытые категории, показываем если showAll = true */}
            {showAll &&
                hiddenCategories.map((cat) => (
                    <Button
                        key={cat}
                        variant={active === cat ? "category_active" : "category_default"}
                        onClick={() => setActive(cat)}
                        className="rounded-s2"
                    >
                        {cat}
                    </Button>
                ))}
        </div>
    );
};
