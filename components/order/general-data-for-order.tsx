"use client"

import React from 'react';
import {cn} from '@/lib/utils';
import Image from "next/image";
import {useCartStore} from '@/store/cartStore';
import {useOrderStore} from "@/store/orderStore";
import {Button} from '../ui/button';
import {useOrderValidation} from "@/hooks/useOrderValidation"
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export default function GeneralDataForOrder ({className}: Props) {

    const {validateAndCreateOrder} = useOrderValidation();

 const cart = useCartStore((state) => state.cart);
 const productsCost:number | undefined = Number(cart?.totalAmount);
 const {deliveryCost} = useOrderStore()

    const finalCost:number = productsCost+deliveryCost || 0;

  const handleCreateOrder = async () => {
    await toast.promise(
      (async () => {
        const result = await validateAndCreateOrder();

        if (result.isCartEmpty) {
          throw new Error("Ваша корзина пуста");
        }

        if (!result.success) {
          throw new Error("Не удалось создать заказ");
        }

        useOrderStore.getState().clearOrderStore();
      }),
      {
        loading: "Создаём заказ...",
        success: "Заказ успешно создан",
        error: (err) => err.message || "Ошибка при создании заказа",
      }
    );
  };

  return (
    <div className={cn('max-w-full w-full rounded-lg bg-white p-7.5 flex flex-col', className)}>
        <div className='flex flex-col gap-3.75 py-7.5 border-b max-w-full w-full'>
            <p className="text-2xl font-regular">FINAL COST:</p>
            <p className="lg:text-2xl text-xl font-medium ">{finalCost.toFixed(2)} <span className="text-secondary">$</span></p>
        </div>

        <div className='flex flex-col items-center gap-15 py-7.5 max-w-full w-full'>
            <div className="flex flex-col items-center gap-7.5 max-w-full w-full">

                {/* Products cost block */}
                <div className="flex flex-row justify-between max-w-full w-full">
                    <div className="flex flex-row gap-3.75 items-center ">
                        <Image alt="box-icon"
                               src="/box-icon.png"
                               width={30}
                               height={30}
                               className="w-5 h-5 md:w-7.5 md:h-7.5"/>

                        <p className="text-sm sm:text-base lg:text-lg">Products cost:</p>
                    </div>

                    <p className="text-sm sm:text-base lg:text-lg">{productsCost? productsCost.toFixed(2) : 0.00} <span className="text-secondary">$</span></p>
                </div>

                {/* Discount block */}
                <div className="flex flex-row justify-between max-w-full w-full">
                    <div className="flex flex-row gap-3.75 items-center ">
                        <Image alt="box-icon"
                               src="/percent-icon.png"
                               width={30}
                               height={30}
                               className="w-5 h-5 md:w-7.5 md:h-7.5"/>

                        <p className="text-sm sm:text-base lg:text-lg">Discount:</p>
                    </div>

                    <p className="text-sm sm:text-base lg:text-lg">0.00 <span className="text-secondary">$</span></p>
                </div>

                {/* Delivery cost block */}
                <div className="flex flex-row justify-between max-w-full w-full">
                    <div className="flex flex-row gap-3.75">
                        <Image alt="box-icon"
                               src="/delivery-icon.png"
                               width={30}
                               height={30}
                               className="w-5 h-5 md:w-7.5 md:h-7.5"/>

                        <p className="text-sm sm:text-base lg:text-lg">Delivery cost:</p>
                    </div>

                    <p className="text-sm sm:text-base lg:text-lg">{deliveryCost? deliveryCost.toFixed(2) : 0.00} <span className="text-secondary">$</span></p>
                </div>

            </div>

            <Button
              variant="default"
              onClick={handleCreateOrder}
              className="lg:max-w-75 lg:max-h-15 lg:text-2xl rounded-[12.5px]
                         max-[375px]:max-w-35 max-[375px]:max-h-10 max-[375px]:text-lg
                         max-w-50 max-h-12.5 w-full h-full text-xl text-primary bg-secondary font-regular hover:bg-gray-500"
            >
              {"GET ORDER"}
            </Button>
        </div>

    </div>
  );
};
