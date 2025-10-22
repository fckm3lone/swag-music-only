// hooks/useCartService.ts
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {useCartStore} from "@/store/cartStore";
import {addItemToCart, getCart, updateItemQuantity} from "@/services/cart";
import axios from "axios";
import toast from "react-hot-toast";

export const useCartService = () => {
    const queryClient = useQueryClient();
    const { setCart, addItem, updateItem, removeItem, clearCart, setLoading, setError } =
        useCartStore();

    // Получение корзины
    const useFetchCart = () => {
        const query = useQuery({
            queryKey: ["cart"],
            queryFn: getCart,
            retry: false,
        });

        useEffect(() => {
            if (query.isSuccess && query.data) {
                setCart(query.data);
                setLoading(false);
                setError(null);
            }
            if (query.isError) {
                setError(query.error?.message || "Не удалось загрузить корзину");
                setLoading(false);
            }
        }, [query.isSuccess, query.isError, query.data, query.error]);

        return query;
    };

    // Добавление товара
    const useAddItem = () =>
        useMutation({
            mutationFn: addItemToCart,
            onMutate: async (data) => {
                toast.loading("Добавление в корзину...", { id: "add-to-cart" });
            },
            onSuccess: () => {
                toast.success("Товар добавлен в корзину", { id: "add-to-cart" });
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
            onError: (error: any) => {
                toast.error(
                    axios.isAxiosError(error) && error.response?.status === 400
                        ? "Ошибка при добавлении"
                        : error.message || "Не удалось добавить товар",
                    { id: "add-to-cart" }
                );
                if (!axios.isAxiosError(error) || error.response?.status !== 400) {
                    setError(error.message || "Не удалось добавить товар");
                }
            },
        });

    // Изменение количества
    const useUpdateItemQuantity = () =>
        useMutation({
            mutationFn: updateItemQuantity,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            },
            onError: (error: any) => {
                setError(error.message || "Не удалось обновить товар");
            },
        });

    return { useFetchCart, useAddItem, useUpdateItemQuantity, clearCart };
};