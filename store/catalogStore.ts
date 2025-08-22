// store/catalogStore.ts
import { create } from "zustand";

type CatalogState = {
    // CategoryTabs
    activeCategory: string;
    showAllCategories: boolean;
    setActiveCategory: (cat: string) => void;
    toggleShowAllCategories: () => void;

    // FilterSidebar
    checkedItems: Record<string, string[]>;
    showMoreStates: Record<string, boolean>;
    toggleItem: (groupTitle: string, item: string) => void;
    isItemChecked: (groupTitle: string, item: string) => boolean;
    toggleShowMore: (title: string) => void;

    // Price
    priceFrom: string;
    priceTo: string;
    setPriceFrom: (value: string) => void;
    setPriceTo: (value: string) => void;
};

export const useCatalogStore = create<CatalogState>((set, get) => ({
    // CategoryTabs
    activeCategory: "All",
    showAllCategories: false,
    setActiveCategory: (cat) => set({ activeCategory: cat }),
    toggleShowAllCategories: () =>
        set((state) => ({ showAllCategories: !state.showAllCategories })),

    // FilterSidebar
    checkedItems: {},
    showMoreStates: {},
    toggleItem: (groupTitle, item) => {
        set((state) => {
            const prevGroupItems = state.checkedItems[groupTitle] || [];
            const isAlreadyChecked = prevGroupItems.includes(item);

            return {
                checkedItems: {
                    ...state.checkedItems,
                    [groupTitle]: isAlreadyChecked
                        ? prevGroupItems.filter((i) => i !== item)
                        : [...prevGroupItems, item],
                },
            };
        });
    },
    isItemChecked: (groupTitle, item) => {
        return get().checkedItems[groupTitle]?.includes(item) ?? false;
    },
    toggleShowMore: (title) => {
        set((state) => ({
            showMoreStates: {
                ...state.showMoreStates,
                [title]: !state.showMoreStates[title],
            },
        }));
    },

    // Price
    priceFrom: "",
    priceTo: "",
    setPriceFrom: (value) => set({ priceFrom: value }),
    setPriceTo: (value) => set({ priceTo: value }),
}));
