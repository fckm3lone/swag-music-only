"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"

export const PriceInput = ({
                               value,
                               onChange,
                               placeholder = "0.00    $",
                               ...props
                           }: React.InputHTMLAttributes<HTMLInputElement>) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            "Backspace", "Tab", "ArrowLeft", "ArrowRight",
            "Delete", "Home", "End", ".", ","
        ]

        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault()
        }
    }

    return (
        <div className="relative">
            <Input
                inputMode="decimal"
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="" // <-- увеличен отступ справа
                {...props}
            />

        </div>
    )
}
