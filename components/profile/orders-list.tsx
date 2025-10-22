'use client'

import React from 'react';
import {cn} from '@/lib/utils';
import Image from "next/image";
import {getOrders} from "@/services/order";
import {useQuery} from '@tanstack/react-query';

interface Props {
  className?: string;

}

export default function OrdersList ({className}: Props) {


    const {data: orders, isLoading} = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
       
    })

    console.log(orders)

    if (isLoading) {
        return (
            <div className={cn("rounded-lg p-7.5 bg-white max-w-full w-full", className)}>
            <p className='mb-10 font-medium text-2xl'>MY ORDERS</p>
            <p>Loading...</p>
            </div>)
    }

    if (!orders || orders?.length === 0) {
        return (
            <div className={cn("rounded-lg p-7.5 bg-white max-w-full w-full", className)}>
                <p className='mb-10 font-medium text-2xl'>MY ORDERS</p>
                <p>You have not any orders</p>
            </div>)
    }

  return (
    <div className={cn("rounded-lg p-7.5 bg-white max-w-full w-full", className)}>
      <p className='mb-10 font-medium text-2xl'>MY ORDERS</p>

      <div className="hidden sm:flex flex-col overflow-y-auto gap-7.5">
        {orders && orders.map(order => (
            <div
              key={order.id}
              className={cn(
                "flex flex-col pb-7.5 gap-4",
                orders[orders.length - 1].id !== order.id && "border-b"
              )}
            >
                <div className="flex items-center justify-between">
                    <p className="font-regular text-xl">ORDER ID:</p>
                    <p className="font-regular text-lg">{order.id} <span className="text-secondary">#</span></p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="font-regular text-xl">TOTAL COST:</p>
                    <p className="font-regular text-lg">{Number(order.totalAmount).toFixed(2)}<span className="text-secondary"> $</span></p>
                </div>



              {
            order.items.map(item => (
                <div
                    key={item.id}
                    className="flex w-full bg-white items-center justify-between"
                >
                  <div className="flex flex-row gap-7.5 items-center">
                    {item.product?.images[0] ? (
                        <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden">
                          <Image
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              width={50}
                              height={50}
                              className="object-contain w-full h-full"
                          />
                        </div>
                    ) : null}
                    <p className="text-lg font-regular">{item.product.name}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2 sm:gap-7.5">
                    <div className="flex items-center gap-2">
                      <p className="text-lg block  m-auto w-full">Units: </p>
                      <span className="text-lg block min-w-2.75 m-auto w-full">
            {item.quantity}
          </span>

                    </div>
                    <div className="min-w-20 flex justify-end sm:min-w-30">
                      <p className="text-lg font-regular">
                        {(Number(item.product.price) * item.quantity).toFixed(2)}{" "}
                        <span className="text-secondary">$</span>
                      </p>
                    </div>
                  </div>
                </div>
            ))
              }

            </div>
        ))}
      </div>
    </div>
  );
};
