"use client"

import React from 'react';
import {cn} from '@/lib/utils';
import {Button, Input} from "@/components/ui";
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    formProfileSchema,
    TFormProfileValues
} from '@/modals/auth-modals/forms/schemas';
import {User} from "@prisma/client";
import toast from "react-hot-toast";
import {Spinner} from "@/components/ui/spinner";
import {updateUserInfo} from "@/app/actions";

interface Props {
  className?: string;
  data: User;
}

export default function ProfileForm ({className, data}: Props) {
    const form = useForm({
        resolver: zodResolver(formProfileSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: TFormProfileValues) => {
        const fullNameParts = data.fullName.trim().split(/\s+/);
        if (
            fullNameParts.length < 2 ||
            fullNameParts.some(part => part.length < 2)
        ) {
            form.setError('fullName', { message: 'Please enter your name and surname (at least 2 characters each)' });
            return;
        }

        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            });

            toast.success('Данные обновлены 📝');
        } catch (error) {
            return toast.error('Ошибка при обновлении данных');
        }
    };

  return (
      <FormProvider {...form}>
      <div className={cn("rounded-lg p-7.5 bg-white max-w-full w-full", className)}>
          <p className='mb-10 font-medium text-2xl'>PROFILE DATA</p>

          <form className="flex flex-col gap-7.5 items-center" onSubmit={form.handleSubmit(onSubmit)}>
<div  className='flex flex-row gap-x-7.5 gap-y-10 flex-wrap w-full'>
              <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                  <p className='text-lg font-regular'>Name</p>
                  <Input
                      {...form.register('fullName')}
                      className={cn("rounded-[12px]")}
                      required
                      placeholder='Insert your full name'
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
                  )}
              </div>



              <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                  <p className='text-lg'>E-mail</p>
                  <Input
                      {...form.register('email')}
                      readOnly={true}
                      className={cn("rounded-[12px]")}
                      required
                      placeholder='E-mail'
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
              </div>

              <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                  <p className='text-lg'>New password</p>
                  <Input
                      {...form.register('password')}
                      className={cn("rounded-[12px]")}

                      placeholder='Insert your new password'
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                  )}
              </div>

              <div className='flex flex-col gap-2 grow shrink basis-[205px] sm:basis-[280px]'>
                  <p className='text-lg'>Confirm password</p>
                  <Input
                      {...form.register('confirmPassword')}
                      className={cn("rounded-[12px]")}
                     
                      placeholder='Repeat your new password'
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                  )}
              </div>
</div>

              <Button type="submit"
                      disabled={form.formState.isSubmitting}
                      className="bg-secondary text-primary max-w-40 w-full
                                             rounded-s2 h-10 mt-2 hover:bg-gray-500
                                             text-primary font-regular text-lg">
                  {
                      form.formState.isSubmitting ?
                          (<Spinner className="h-5 w-5 text-gray-400"/>)
                          :
                          "Save changes"

                  }
              </Button>
          </form>
      </div>
      </FormProvider>
  );
};
