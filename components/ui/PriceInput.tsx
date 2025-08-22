"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

type PriceInputProps = {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

export const PriceInput = ({
                               value,
                               onValueChange,
                               placeholder = "0.00 $",
                               ...props
                           }: PriceInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            "Backspace",
            "Tab",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
            "Home",
            "End",
            ".",
            ",",
        ];

        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.target.value);
    };

    return (
        <div className="relative">
            <Input
                inputMode="decimal"
                type="text"
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
};
