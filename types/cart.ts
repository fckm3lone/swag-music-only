import axios from "axios";

import {Cart, CartItem} from "@prisma/client";
import {ProductWithImages} from "@/types/product";

export type CartItemWithImagesType = CartItem & {
    product: ProductWithImages,

}

export type CartWithItemsType = Cart & {
    items: CartItemWithImagesType[];
}