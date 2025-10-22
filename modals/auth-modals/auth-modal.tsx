import React, {useState} from 'react';
import {Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
import Image from "next/image";
import {Button} from '@/components/ui/button';
import {signIn} from "next-auth/react";
import LoginForm from './forms/login-form';
import RegisterForm from "@/modals/auth-modals/forms/register-form";

interface Props {
    open: boolean,
    onClose: () => void,

}

export function AuthModal ({open, onClose}: Props) {

    const [logOrReg,setLogOrReg] = useState(true);
    const handleClose = () => {
        onClose();
    }

  return (


        <Dialog open={open} onOpenChange={handleClose}>

            <DialogTitle title="Authorization" />

            <DialogContent className="max-w-110 w-full bg-gray-100 p-7.5">
                {logOrReg ? (
                    <div className="flex flex-col gap-4">
                    <LoginForm onClose={handleClose} />
                    <p>Have not account yet?
                        <Button  variant="link"
                                 onClick={() => setLogOrReg(false)}
                                 className="text-secondary w-15"> Sign up
                        </Button>
                    </p>
                    </div>
                    )
                           :
                    (<div className="flex flex-col gap-4">
                    <RegisterForm onClose={handleClose} />
                    <p>Already have an account?
                    <Button variant="ghost"
                            onClick={() => setLogOrReg(true)}
                            className="text-secondary w-15"> Sign in
                    </Button>
                    </p>
                    </div>)
                }


                <hr />

                <div className="flex gap-4">
                    <Button variant="default"
                            type="button"
                            onClick={()=>
                                signIn('github', {
                                    callbackUrl:"/",
                                    redirect:true
                                })}
                            className="flex-1 gap-2 h-12 p-2 rounded-s2 text-primary-foreground ">
                        <Image src="/github.svg" alt="github" width={24} height={24} />
                        Github
                    </Button>

                    <Button variant="default"
                            type="button"
                            onClick={()=>
                                signIn('google', {
                                    callbackUrl:"/",
                                    redirect:true
                                })}
                            className="flex-1 gap-2 h-12 p-2 rounded-s2 text-primary-foreground ">
                        <Image src="/google.png" alt="google" width={24} height={24} />
                        Google
                    </Button>

                </div>

            </DialogContent>

        </Dialog>

  );
};
