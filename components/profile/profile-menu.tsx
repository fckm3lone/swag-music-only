"use client"
import React from 'react';
import {cn} from '@/lib/utils';
import {signOut} from "next-auth/react";
import {Button} from '../ui/button';

interface Props {
  className?: string;
  active: string;
  setActive: (section: string) => void;
}

export default function ProfileMenu ({className, active, setActive}: Props) {

  const onClickSignOut = () => {

    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <div className={cn("hidden md:block w-full bg-primary p-7.5 h-fit sticky top-0 rounded-lg", className)}>
      <div className="flex flex-col gap-y-2 w-full items-center">
        <a
          href="#profile"
          onClick={() => setActive('profile')}
          className={cn(
            "w-full px-4 py-2 border rounded-s2 text-center transition",
            active === 'profile' ? 'bg-secondary text-white' : 'hover:bg-gray-100'
          )}
        >
          Personal Data
        </a>
        <a
          href="#orders"
          onClick={() => setActive('orders')}
          className={cn(
            "w-full px-4 py-2 border rounded-s2 text-center transition",
            active === 'orders' ? 'bg-secondary text-white' : 'hover:bg-gray-100'
          )}
        >
          My Orders
        </a>
        <Button
          onClick={onClickSignOut}
          variant="link"
          className="text-red-500 mt-6 w-fit"
        >
          Quit Account →
        </Button>
      </div>
    </div>
  );
};
