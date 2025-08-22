"use client";

import { Button } from "@/components/ui";
import { useCatalogStore } from "@/store/catalogStore";

const allCategories = ["All", "String", "Keyboard", "Wind", "Percussion", "Drums", "Synth", "Bass"];

export const CategoryTabs = () => {
    const active = useCatalogStore((s) => s.activeCategory);
    const setActive = useCatalogStore((s) => s.setActiveCategory);
    const showAll = useCatalogStore((s) => s.showAllCategories);
    const toggleShowAll = useCatalogStore((s) => s.toggleShowAllCategories);

    const visibleCategories = allCategories.slice(0, 5);
    const hiddenCategories = allCategories.slice(5);

    return (
        <div className="flex gap-2 flex-wrap">
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

            {hiddenCategories.length > 0 && (
                <Button
                    variant="category_default"
                    onClick={toggleShowAll}
                    className="rounded-s2 font-regular"
                >
                    {showAll ? "←" : "→"}
                </Button>
            )}

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
