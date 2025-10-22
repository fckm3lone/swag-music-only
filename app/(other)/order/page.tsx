import {Container, PageTitle} from '@/components/shared';
import React from 'react';
import CartDataForOrder from "@/components/order/cart-data-for-order";
import PersonalDataForOrder from "@/components/order/personal-data-for-order";
import DeliveryDataForOrder from '@/components/order/delivery-data-for-order';
import GeneralDataForOrder from '@/components/order/general-data-for-order';
import {getUserSession} from "@/lib/get-user-session";
import {redirect} from "next/navigation";
import prisma from "@/prisma/prisma-client";


interface Props {
  className?: string;
}

export default async function OrderPage () {
    const session = await getUserSession();
    if (!session) {
        return redirect("/?notAuth");
    }



    const user = await prisma.user.findFirst({ where: { id: Number(session.id) } });
    if (!user) return redirect("/?notAuth");
  return (

    <Container>
        <PageTitle title={"GET ORDER"} className="mb-10 "/>
        <div className='flex flex-row gap-10 max-[1350px]:flex-wrap max-[1350px]:items-center justify-center'>

            <div className='flex flex-col gap-10 max-w-230'>
                <CartDataForOrder/>
                <PersonalDataForOrder/>
                <DeliveryDataForOrder/>
            </div>

            <div className='flex basis-97.5 grow shrink max-h-150 max-w-155 max-[1350px]:max-w-230'>
                <GeneralDataForOrder/>
            </div>

        </div>
    </Container>

  );
};
