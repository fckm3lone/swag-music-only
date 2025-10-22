"use client"

import React from 'react';
import {Input} from '../ui/input';
import {cn} from '@/lib/utils';
import {useOrderStore} from "@/store/orderStore";
import {useValidationStore} from "@/store/validationStore";

interface Props {
    className?: string;
}

export default function PersonalDataForOrder({ className }: Props) {
    const { firstName, lastName, email, phoneNumber, setFirstName, setLastName, setEmail, setPhoneNumber } = useOrderStore();
    const { isFirstName, messageFirstName, isLastName, messageLastName, isEmail, messageEmail, isPhoneNumber, messagePhoneNumber } = useValidationStore();

    return (
        <div className={cn("rounded-lg p-7.5 bg-white max-w-full w-full", className)}>
            <p className='mb-10 font-medium text-2xl'>2. PERSONAL DATA</p>

            <div className='flex flex-row gap-x-7.5 gap-y-10 flex-wrap w-full'>

                <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                    <p className='text-lg font-regular'>Name</p>
                    <Input
                        value={firstName}
                        className={cn("rounded-[12px]", !isFirstName && "border-red-500")}
                        required
                        placeholder='Insert your name'
                        onChange={(e) => setFirstName(e.target.value.trim())}
                    />
                    {!isFirstName && messageFirstName && <p className="text-red-500 text-sm">{messageFirstName}</p>}
                </div>

                <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                    <p className='text-lg'>Second name</p>
                    <Input
                        value={lastName}
                        className={cn("rounded-[12px]", !isLastName && "border-red-500")}
                        required
                        placeholder='Insert your second name'
                        onChange={(e) => setLastName(e.target.value.trim())}
                    />
                    {!isLastName && messageLastName && <p className="text-red-500 text-sm">{messageLastName}</p>}
                </div>

                <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                    <p className='text-lg'>E-mail</p>
                    <Input
                        value={email}
                        className={cn("rounded-[12px]", !isEmail && "border-red-500")}
                        required
                        placeholder='Insert your e-mail'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isEmail && messageEmail && <p className="text-red-500 text-sm">{messageEmail}</p>}
                </div>

                <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                    <p className='text-lg'>Phone number</p>
                    <Input
                        value={phoneNumber}
                        className={cn("rounded-[12px]", !isPhoneNumber && "border-red-500")}
                        required
                        placeholder='Insert your phone number'
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {!isPhoneNumber && messagePhoneNumber && <p className="text-red-500 text-sm">{messagePhoneNumber}</p>}
                </div>

            </div>
        </div>
    );
}