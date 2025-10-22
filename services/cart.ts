// services/cart.ts
import { axiosInstance } from "@/services/axiosInstance";
import { ApiRoutes } from "@/services/constants";
import { CartWithItemsType, CartItemWithImagesType } from "@/types/cart";

// Получить корзину
export async function getCart(): Promise<CartWithItemsType | null> {
    const { data } = await axiosInstance.get<CartWithItemsType | null>(
        ApiRoutes.CART_API,
        { withCredentials: true } // 👈 важно для отправки cookie
    );
    return data;
}

// Добавить товар
export async function addItemToCart({
                                        productId,
                                        quantity,
                                    }: {
    productId: number;
    quantity: number;
}): Promise<CartItemWithImagesType> {
    const { data } = await axiosInstance.post<CartItemWithImagesType>(
        ApiRoutes.CART_API,
        { productId, quantity },
        { withCredentials: true } // 👈 cookie уйдут вместе
    );
    return data;
}

// Обновить количество
export async function updateItemQuantity({
                                             cartItemId,
                                             action,
                                         }: {
    cartItemId: number;
    action: "increment" | "decrement";
}): Promise<CartItemWithImagesType | { success: boolean; deleted: boolean }> {
    const { data } = await axiosInstance.patch<
        CartItemWithImagesType | { success: boolean; deleted: boolean }
    >(
        ApiRoutes.CART_API,
        { cartItemId, action },
        { withCredentials: true }
    );
    return data;
}