import React from 'react';
import {FormProvider, useForm} from 'react-hook-form'
import {
  formRegisterSchema,
  TFormRegisterValues
} from "@/modals/auth-modals/forms/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from '@/components/ui/input';
import {Spinner} from "@/components/ui/spinner";
import {Button} from '@/components/ui/button';
import toast from "react-hot-toast";
import {cn} from '@/lib/utils';
import {registerUser} from "@/app/actions";

interface Props {
  className?: string;
  onClose: () => void;
}

export default function RegisterForm ({className,onClose}: Props) {

  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''

    }
  })
  console.log(form.formState.errors);

  const onSubmit = async (values: TFormRegisterValues) => {
    try {


      const response = await registerUser(
          {
            email: values.email,
            fullName: values.fullName,
            password: values.password,
          })
      if(!response?.success) {
        return toast.error(`${response?.message}`)
      }

      toast.success("Verification letter was send to your E-mail");
      onClose?.()
    } catch (e) {
      console.error(e)
      toast.error(`${e}`)
    }
  }

  return (
      <FormProvider {...form}>

        <div className="flex flex-col items-center w-full gap-4">

          <p className="text-lg text-primary-foreground  font-medium mb-2">Registration</p>

          <form className="flex flex-col gap-4 w-full items-center" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
              <Input placeholder="Fullname"
                     {...form.register("fullName")}
                     required
                     className={cn("bg-primary text-primary-foreground rounded-s2", form.formState.errors.fullName && "border-red-500")}/>
              {form.formState.errors.fullName && (
                  <p className="text-sm text-red-500 pl-2">{form.formState.errors.fullName.message}</p>
              )}

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

              <Input placeholder="Confirm Password"
                     {...form.register("confirmPassword")}
                     type="password"
                     className={cn("bg-primary text-primary-foreground rounded-s2", form.formState.errors.confirmPassword && "border-red-500 ")}
                     required />
              {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500  pl-2">{form.formState.errors.confirmPassword.message}</p>
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
                    "Sign Up"

              }
            </Button>
          </form>

        </div>

      </FormProvider>
  );
};
