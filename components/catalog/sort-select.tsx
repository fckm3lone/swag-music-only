// components/catalog/sort-select.tsx
"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface SortSelectProps {
    value: string | null;
    onChange: (value: string) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
    return (
        <Select value={value ?? undefined} onValueChange={onChange}>
            <SelectTrigger className="w-[220px] rounded-s2">
                <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="price-asc">Цена ↑</SelectItem>
                <SelectItem value="price-desc">Цена ↓</SelectItem>
                <SelectItem value="name-asc">Название A–Z</SelectItem>
                <SelectItem value="name-desc">Название Z–A</SelectItem>
            </SelectContent>
        </Select>
    );
};
