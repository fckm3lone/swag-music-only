"use client";

import { FC } from "react";
import { Button } from "@/components/ui";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

interface ProductPriceBlockProps {
    price: number;
    currency?: string; // по умолчанию "$"
    onAddToCart?: () => void;
}

export const ProductPriceBlock: FC<ProductPriceBlockProps> = ({
                                                                  price,
                                                                  currency = "$",
                                                                  onAddToCart,
                                                              }) => {
    const formatted = price.toFixed(2).replace(".", ",");

    return (
        <div className="mt-4 border-t  border-border pt-4">
            <div className="text-xl font-medium text-left mt-4 mb-2">
                {formatted} <span className="text-secondary font-regular">{currency}</span>
            </div>
            <Button
                variant="link"
                onClick={onAddToCart}
                className="w-auto p-0 text-secondary cursor-pointer gap-2 uppercase text-2xl font-regular justify-start "
            >
                TO CART
                <Image src="/cart.png" alt="🗑️" width={25}
                 height={25}/>
            </Button>
        </div>
    );
};
