"use client"

import React from 'react';
import DeliveryDataPicker from "@/components/order/delivery-data-picker";
import {cn} from '@/lib/utils';
import {Input} from "@/components/ui";
import {useOrderStore} from "@/store/orderStore";
import {useValidationStore} from "@/store/validationStore";

interface Props {
  className?: string;
}

export default function DeliveryDataForOrder ({className}: Props) {

    const {deliveryAdres, setDeliveryAdres} = useOrderStore()
    const { isDeliveryAdres, messageDeliveryAdres } = useValidationStore();

  return (
    <div className={cn('p-7.5 bg-white rounded-lg max-w-full w-full',className)}>
        <p className='mb-10 font-medium text-2xl'>3. DELIVERY</p>

        <div className="flex flex-col gap-2 mb-7.5 grow shrink basis-[205px] sm:basis-[280px]">
            <p className="text-lg font-regular">Delivery Adress</p>
            <Input
              value={deliveryAdres}
              className={cn("rounded-[12px]", !isDeliveryAdres && "border-red-500")}
              placeholder='Insert your address'
              required
              onChange={(e) => setDeliveryAdres(e.target.value)}
            />
            {!isDeliveryAdres && messageDeliveryAdres && (
              <p className="text-red-500 text-sm">{messageDeliveryAdres}</p>
            )}
        </div>
        <DeliveryDataPicker/>
    </div>
  );
};
