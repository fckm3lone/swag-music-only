"use client";

import {Checkbox, Input} from "@/components/ui";
import { useState } from "react";
import { Button } from "@/components/ui";
import {PriceInput} from "@/components/ui/PriceInput";

const attributeGroups = [
    {
        title: "Brands",
        items: ["Rolland", "Yamaha", "Uptone", "AKG", "JBL", "Shure"],
    },
    {
        title: "Types",
        items: ["Electrical guitars", "Classic guitars", "Ukulele", "Keyboard", "Wind instruments"],
    },
    {
        title: "Colors",
        items: ["Black", "White", "Red", "Blue", "Green"],
    },
];

export const FilterSidebar = () => {
    // Состояние для чекбоксов: Record<группа, массив выбранных элементов>
    const [checkedItems, setCheckedItems] = useState<Record<string, string[]>>({});
    // Состояние для отображения "Show more"
    const [showMoreStates, setShowMoreStates] = useState<Record<string, boolean>>({});

    // Переключение выбранности элемента
    const toggleItem = (groupTitle: string, item: string) => {
        setCheckedItems((prev) => {
            const prevGroupItems = prev[groupTitle] || [];
            const isAlreadyChecked = prevGroupItems.includes(item);

            return {
                ...prev,
                [groupTitle]: isAlreadyChecked
                    ? prevGroupItems.filter((i) => i !== item)
                    : [...prevGroupItems, item],
            };
        });
    };

    // Проверка, выбран ли элемент
    const isItemChecked = (groupTitle: string, item: string) => {
        return checkedItems[groupTitle]?.includes(item) ?? false;
    };

    // Переключение состояния "Show more"
    const toggleShowMore = (title: string) => {
        setShowMoreStates((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <aside className="w-64 flex-shrink-0">
            <div className="mb-4">
                <h4 className="font-medium mb-2">Available</h4>
                <div className="flex items-center space-x-2 mb-2">
                    <Checkbox id="available" />
                    <label htmlFor="available" className="text-sm">Available</label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="on-order" />
                    <label htmlFor="on-order" className="text-sm">On order</label>
                </div>
            </div>

            <div className="mb-4">
                <h4 className="font-medium mb-2">Price <span className="text-secondary-foreground">from</span> to</h4>
                <div className="flex items-center space-x-2 flex-row">

                    <PriceInput className="bg-transparent rounded-s2 border w-20"/>


                    <p className="font-thin text-foreground ">-</p>


                    <PriceInput className="bg-transparent rounded-s2 border w-20 text-foreground font-thin"/>


                </div>
            </div>

            {attributeGroups.map((group) => {
                const showMore = showMoreStates[group.title] || false;
                const displayedItems = showMore ? group.items : group.items.slice(0, 5);

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
                                <label htmlFor={`${group.title}-${item}`} className="text-sm">{item}</label>
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
