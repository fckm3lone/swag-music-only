import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Button} from "@/components/ui";
import CartDrawer from "@/components/shared/cart-drawer";

interface Props {
  className?: string;
}

export default function CartButton({className}: Props) {
  return (
    <CartDrawer className={cn("", className)}>
        <Button variant="header_ghost" size="icon" className="bg-transparent p-0">
            <Image src="/cart.png" alt="Cart" width={40} height={40} />
        </Button>
    </CartDrawer>
  );
};
