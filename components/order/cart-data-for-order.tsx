"use client"

import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui";
import {useCartStore} from "@/store/cartStore";
import {useCartService} from "@/hooks/useCartService";
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export default function  ({className}: Props) {

    const { cart, isLoading, error } = useCartStore();
    const { useFetchCart, useUpdateItemQuantity } = useCartService();

    // Загружаем корзину при монтировании
    const { isLoading: queryLoading, isError, error: queryError } = useFetchCart();

    // Мутация для обновления количества
    const updateItemMutation = useUpdateItemQuantity();

    // Обработчики
    const handleIncrement = (cartItemId: number) => {
        updateItemMutation.mutate({ cartItemId, action: "increment" });
    };

    const handleDecrement = (cartItemId: number) => {
        updateItemMutation.mutate({ cartItemId, action: "decrement" });
    };



  return (
    <div className={cn("rounded-lg p-7.5 bg-white", className)}>
        <p className='mb-10 font-medium text-2xl'>1. CART</p>
        {/* Список товаров или сообщения */}
        <div className="w-full">
          {(isLoading || queryLoading) && (
            <div className="p-4 text-center">Загрузка корзины...</div>
          )}
          {(error || isError) && (
            <div className="p-4 text-center mb-10 text-red-500">
              Ошибка: {error || queryError?.message}
            </div>
          )}
          {!(isLoading || queryLoading) && !error && !isError && (!cart || cart.items.length === 0) && (
            <div className="p-4 text-center mb-10">Ваша корзина пуста</div>
          )}
          {!(isLoading || queryLoading) && !error && !isError && cart && cart.items.length > 0 && (
            <>
              {/* Desktop layout (>=640px) */}
              <div className="hidden sm:flex flex-col overflow-y-auto gap-3.75">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full bg-white items-center justify-between"
                  >
                    <div className="flex flex-row gap-7.5 items-center">
                      {item.product.images[0]?.url && (
                        <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}
                      <p className="text-lg font-regular">{item.product.name}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2 sm:gap-7.5">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6"
                          onClick={() => handleDecrement(item.id)}
                          disabled={updateItemMutation.isPending}
                        >
                          -
                        </Button>
                        <span className="text-lg block min-w-2.75 m-auto w-full">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6"
                          onClick={() => handleIncrement(item.id)}
                          disabled={item.quantity >= 10 || updateItemMutation.isPending}
                        >
                          +
                        </Button>
                      </div>
                      <div className="min-w-20 flex justify-end sm:min-w-30">
                        <p className="text-lg font-regular ">
                          {(Number(item.product.price) * item.quantity).toFixed(2)}{" "}
                          <span className="text-secondary">$</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile layout (<640px) */}
              <div className="flex sm:hidden flex-col overflow-y-auto gap-10">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full bg-white items-stretch justify-between  p-0"
                  >
                    <div className="flex flex-row gap-4 max-w-70">
                      {item.product.images[0]?.url && (
                        <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden">
                          <Image
                            src={item.product.images[0].url}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-between">
                        <p className="text-base font-regular mb-5">{item.product.name}</p>

                          <div className="min-[375px]:hidden">
                              <p className="text-md font-regular ">
                                  {(Number(item.product.price) * item.quantity).toFixed(2)}{" "}
                                  <span className="text-secondary">$</span>
                              </p>
                          </div>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6"
                            onClick={() => handleDecrement(item.id)}
                            disabled={updateItemMutation.isPending}
                          >
                            -
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 w-6"
                            onClick={() => handleIncrement(item.id)}
                            disabled={item.quantity >= 10 || updateItemMutation.isPending}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end max-[375px]:hidden">
                      <p className="text-md font-regular ">
                        {(Number(item.product.price) * item.quantity).toFixed(2)}{" "}
                        <span className="text-secondary">$</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
    </div>
  );
};
