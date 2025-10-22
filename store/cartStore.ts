// store/cartStore.ts
import { create } from "zustand";
import {CartItemWithImagesType, CartWithItemsType} from "@/types/cart";


type CartState = {
    cart: CartWithItemsType | null;
    isLoading: boolean;
    error: string | null;

    setCart: (cart: CartWithItemsType | null) => void;
    addItem: (item: CartItemWithImagesType) => void;
    updateItem: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    clearCart: () => void;
    setLoading: (value: boolean) => void;
    setError: (message: string | null) => void;
};

export const useCartStore = create<CartState>((set) => ({
    cart: null,
    isLoading: false,
    error: null,

    setCart: (cart) => set({ cart }),
    addItem: (item) =>
        set((state) => {
            if (!state.cart) return state;

            return {
                cart: {
                    ...state.cart,
                    items: [...state.cart.items, item],
                },
            };
        }),
    updateItem: (productId, quantity) =>
        set((state) => {
            if (!state.cart) return state;

            return {
                cart: {
                    ...state.cart,
                    items: state.cart.items.map((i) =>
                        i.productId === productId ? { ...i, quantity } : i
                    ),
                },
            };
        }),
    removeItem: (productId) =>
        set((state) => {
            if (!state.cart) return state;

            return {
                cart: {
                    ...state.cart,
                    items: state.cart.items.filter((i) => i.productId !== productId),
                },
            };
        }),
    clearCart: () => set({ cart: null }),
    setLoading: (value) => set({ isLoading: value }),
    setError: (message) => set({ error: message }),
}));