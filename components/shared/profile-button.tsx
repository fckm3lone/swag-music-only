'use client'
import React from 'react';
import {Button} from '../ui/button';
import Image from "next/image";
import {cn} from '@/lib/utils';
import {useSession} from "next-auth/react";
import Link from 'next/link';
import {useOpenAuthStore} from "@/store/openAuthStore";
import {AuthModal} from '@/modals/auth-modals/auth-modal';

interface Props {
  className?: string;
  onClickSignIn?: () => void;
}

export default function ProfileButton ({className, onClickSignIn}: Props) {

    const {isOpen, setIsOpen} = useOpenAuthStore()

    const {data:session} = useSession();
    console.log(session, 999);

  return (
      <div className={cn("", className)}>
          <AuthModal open={isOpen} onClose={()=> setIsOpen(false)} />


      {!session ? (
        <Button onClick={()=>setIsOpen(true)}
                variant="header_ghost"
                size="icon"
                className="bg-transparent p-0">
            <Image src="/profile.png" alt="Profile" width={40} height={40} />
        </Button>
    ) : (   <Link href="/profile">
            <Button 
                    variant="header_ghost"
                    size="icon"
                    className="bg-transparent p-0">
                <Image src="/profile.png" alt="Profile" width={40} height={40} />
            </Button>
          </Link>
      )}
      </div>

  );
};
