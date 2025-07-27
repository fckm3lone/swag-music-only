"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SortSelect = () => {
    return (
        <Select >
            <SelectTrigger className="w-[180px] rounded-s2">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
        </Select>
    );
};
