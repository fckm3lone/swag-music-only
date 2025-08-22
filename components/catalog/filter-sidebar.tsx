"use client";

import { Checkbox, Button } from "@/components/ui";
import { PriceInput } from "@/components/ui/PriceInput";
import { useCatalogStore } from "@/store/catalogStore";

const attributeGroups = [
    {
        title: "Brands",
        items: ["Rolland", "Yamaha", "Uptone", "AKG", "JBL", "Shure"],
    },
    {
        title: "Types",
        items: [
            "Electrical guitars",
            "Classic guitars",
            "Ukulele",
            "Keyboard",
            "Wind instruments",
        ],
    },
    {
        title: "Colors",
        items: ["Black", "White", "Red", "Blue", "Green"],
    },
];

export const FilterSidebar = () => {
    const checkedItems = useCatalogStore((s) => s.checkedItems);
    const toggleItem = useCatalogStore((s) => s.toggleItem);

    const showMoreStates = useCatalogStore((s) => s.showMoreStates);
    const toggleShowMore = useCatalogStore((s) => s.toggleShowMore);

    const priceFrom = useCatalogStore((s) => s.priceFrom);
    const priceTo = useCatalogStore((s) => s.priceTo);
    const setPriceFrom = useCatalogStore((s) => s.setPriceFrom);
    const setPriceTo = useCatalogStore((s) => s.setPriceTo);

    const isItemChecked = (groupTitle: string, item: string) =>
        checkedItems[groupTitle]?.includes(item) ?? false;

    return (
        <aside className="w-64 flex-shrink-0">
            {/* Availability */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">Available</h4>
                <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                        id="available"
                        checked={isItemChecked("Available", "Available")}
                        onCheckedChange={() => toggleItem("Available", "Available")}
                    />
                    <label htmlFor="available" className="text-sm">
                        Available
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="on-order"
                        checked={isItemChecked("Available", "On order")}
                        onCheckedChange={() => toggleItem("Available", "On order")}
                    />
                    <label htmlFor="on-order" className="text-sm">
                        On order
                    </label>
                </div>
            </div>

            {/* Price */}
            <div className="mb-4">
                <h4 className="font-medium mb-2">
                    Price <span className="text-secondary-foreground">from</span> to
                </h4>
                <div className="flex items-center space-x-2 flex-row">
                    <PriceInput
                        value={priceFrom}
                        onValueChange={setPriceFrom}
                        className="bg-transparent rounded-s2 border w-20"
                    />
                    <p className="font-thin text-foreground">-</p>
                    <PriceInput
                        value={priceTo}
                        onValueChange={setPriceTo}
                        className="bg-transparent rounded-s2 border w-20 text-foreground font-thin"
                    />
                </div>
            </div>

            {/* Attribute groups */}
            {attributeGroups.map((group) => {
                const showMore = showMoreStates[group.title] || false;
                const displayedItems = showMore
                    ? group.items
                    : group.items.slice(0, 5);

                return (
                    <div key={group.title} className="mb-4">
                        <h4 className="font-medium mb-2">{group.title}</h4>
                        {displayedItems.map((item) => (
                            <div key={item} className="flex items-center space-x-2 mb-2">
                                <Checkbox
                                    id={`${group.title}-${item}`}
                                    checked={isItemChecked(group.title, item)}
                                    onCheckedChange={() => toggleItem(group.title, item)}
                                />
                                <label
                                    htmlFor={`${group.title}-${item}`}
                                    className="text-sm"
                                >
                                    {item}
                                </label>
                            </div>
                        ))}
                        {group.items.length > 5 && (
                            <Button
                                variant="filter_more"
                                onClick={() => toggleShowMore(group.title)}
                                className="p-0 text-foreground text-xl font-regular"
                            >
                                {showMore ? "↑" : "..."}
                            </Button>
                        )}
                    </div>
                );
            })}
        </aside>
    );
};
