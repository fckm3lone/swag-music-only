// app/components/CartDrawer.tsx
'use client'

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {useCartStore} from "@/store/cartStore";
import {useCartService} from "@/hooks/useCartService";
import Image from "next/image";
import Link from "next/link";


interface Props {
  className?: string;
}

export default function CartDrawer({ className, children }: React.PropsWithChildren<Props>) {
  const { cart, isLoading, error } = useCartStore();
  const { useFetchCart, useUpdateItemQuantity, clearCart } = useCartService();

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



  // Расчет общей стоимости и количества товаров
  const totalCount = cart?.totalCount|| 0;
  const finalCost = Number(cart?.totalAmount) ?? 0.00;
  const discount = 0.00;

  return (
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side="right" className="flex flex-col justify-between pb-0 bg-[#F5F5F5] min-w-[440px] max-[440px]:min-w-[320px]">
          <SheetHeader>
            <SheetTitle className="mb-10">
              <p className="font-regular text-md">
              Cart products: <span className="text-secondary">{totalCount}</span>
              </p>
            </SheetTitle>
          </SheetHeader>

          {/* Список товаров или сообщения */}
          <div className="flex flex-col overflow-y-auto gap-3">
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
                cart.items.map((item) => (
                    <div
                        key={item.id}
                        className="flex w-full bg-white items-stretch justify-between p-6"
                    >
                      {/* Левая часть: картинка + инфо */}
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
                          <p className="text-md font-regular">{item.product.name}</p>
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

                      {/* Правая часть: прайс */}
                      <div className="flex flex-col justify-end ">
                        <p className="text-md font-regular ">
                          {(Number(item.product.price) * item.quantity).toFixed(2)}{" "}
                          <span className="text-secondary">$</span>
                        </p>
                      </div>
                    </div>
                ))
            )}
          </div>

          {/* Футер с итогами */}
          {cart && cart.items.length > 0 && (
              <SheetFooter className="bg-white px-7.5 py-10">
                <div className="flex w-full flex-col items-center gap-6">
                  <div className="flex flex-col items-center w-full gap-3">
                    <div className="flex w-full justify-between">
                      <p className="text-lg font-regular text-primary-foreground">Final cost:</p>
                      <p className="text-lg font-regular text-primary-foreground">
                        {finalCost.toFixed(2)} <span className="text-secondary">$</span>
                      </p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="text-lg font-regular text-primary-foreground">Discount:</p>
                      <p className="text-lg font-regular text-primary-foreground">
                        {discount.toFixed(2)} <span className="text-secondary">$</span>
                      </p>
                    </div>
                  </div>


                  <Link href="/order">
                    <Button
                        variant="default"
                        className="bg-secondary hover:bg-gray-500 py-2.5 px-7.5 w-fit text-primary font-regular text-lg"
                    >
                      GET ORDER
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
  );
}