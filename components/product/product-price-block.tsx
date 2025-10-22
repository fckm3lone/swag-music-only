// components/product/product-price.tsx
"use client";

import { FC } from "react";
import {Button, Skeleton} from "@/components/ui";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import {useCartService} from "@/hooks/useCartService";

interface ProductPriceBlockProps {
    id: number;
    price: number;
    currency?: string; // по умолчанию "$"
    onAddToCart?: () => void;
}

export const ProductPriceBlock: React.FC<ProductPriceBlockProps & { isLoading?: boolean }> = ({id,
                                                                                                  price,
                                                                                                  currency = "$",
                                                                                                  isLoading,
                                                                                              }) => {
    const {useAddItem} = useCartService()

    const addItemMutation = useAddItem();

    const handleAddToCart = (id: number) => {
        addItemMutation.mutate({productId: id, quantity: 1})

    }

    if (isLoading) {
        return (
            <div className="mt-4 border-t border-border pt-4">
                <Skeleton className="h-6 w-1/3 mb-3" />
                <Skeleton className="h-8 w-38" />
            </div>
        );
    }

    const formatted = price.toFixed(2).replace(".", ",");

    return (
        <div className="mt-4 pt-4">
            {/* короткая линия сверху */}
            <div className="w-full border-t border-border mb-4"></div>

            <div className="text-xl font-medium text-left mt-4 mb-2 max-[767px]:text-lg">
                {formatted} <span className="text-secondary font-regular">{currency}</span>
            </div>

            <Button
                variant="link"
                onClick={()=> handleAddToCart(id)}
                className="w-auto p-0 text-secondary cursor-pointer gap-2 uppercase text-2xl font-regular justify-start max-[767px]:text-xl"
            >
                TO CART
                <Image src="/cart.png" alt="🗑️" width={25} height={25} />
            </Button>
        </div>

    );
};
