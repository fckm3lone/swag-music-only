import React from 'react';
import {FormProvider, useForm} from 'react-hook-form'
import {
    formLoginSchema,
    TFormLoginValues
} from "@/modals/auth-modals/forms/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from '@/components/ui/input';
import {Spinner} from "@/components/ui/spinner";
import {Button} from '@/components/ui/button';
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {cn} from '@/lib/utils';

interface Props {
  className?: string;
  onClose: () => void;
}

export default function LoginForm ({className,onClose}: Props) {

    const form = useForm<TFormLoginValues>({
            resolver: zodResolver(formLoginSchema),
            defaultValues: {
                email: '',
                password: ''
            }
    })


    const onSubmit = async (values: TFormLoginValues) => {
        try {
            const response = await signIn('credentials',
                {
                    ...values,
                    redirect:false
                })
            if(!response?.ok) {
                return toast.error(`${response?.error}`)
            }

            toast.success("Successfully logged in");
            onClose?.()
        } catch (e) {
            console.error(e)
            toast.error(`${e}`)
        }
    }

  return (
    <FormProvider {...form}>

        <div className="flex flex-col items-center w-full gap-4">

            <p className="text-lg text-primary-foreground  font-medium mb-2">Authorization</p>

        <form className="flex flex-col gap-4 w-full items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
            <Input placeholder="Email"
                   {...form.register("email")}
                   required
                   className={cn("bg-primary text-primary-foreground rounded-s2", form.formState.errors.email && "border-red-500")}/>
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 pl-2">{form.formState.errors.email.message}</p>
            )}

            <Input placeholder="Password"
                   {...form.register("password")}
                   type="password"
                   className={cn("bg-primary text-primary-foreground rounded-s2", form.formState.errors.password && "border-red-500 ")}
                   required />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500  pl-2">{form.formState.errors.password.message}</p>
            )}
            </div>
            <Button type="submit"
                    disabled={form.formState.isSubmitting}
                    className="bg-secondary text-primary max-w-40 w-full
                                             rounded-s2 h-10 mt-2 hover:bg-gray-500
                                             text-primary font-regular text-base">
                {
                    form.formState.isSubmitting ?
                        (<Spinner className="h-5 w-5 text-gray-400"/>)
                        :
                        "Log In"

                }
            </Button>
        </form>

        </div>

    </FormProvider>
  );
};
