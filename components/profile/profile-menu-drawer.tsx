import React from 'react';
import {cn} from '@/lib/utils';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger
} from '@/components/ui/drawer';
import {Menu} from 'lucide-react';
import {Button} from '../ui/button';

interface Props {
  className?: string;
  active: string;
  setActive: (section: string) => void;
}

export default function ProfileMenuDrawer({ className, active, setActive }: Props) {
  const handleClick = (section: string) => {
    setActive(section);
  };

  return (
    <Drawer>
      <DrawerTrigger className="absolute top-28 right-0 z-[9999] block md:hidden">
        <Menu className="w-7.5 h-7.5 opacity-80" />
      </DrawerTrigger>
      <DrawerContent className={cn('p-4', className)}>
        <div className="flex flex-col gap-y-2 items-center">
          <DrawerClose asChild>
            <a
              href="#profile"
              onClick={() => handleClick('profile')}
              className={cn(
                'w-full px-4 py-2 border rounded-s2 text-center transition',
                active === 'profile'
                  ? 'bg-secondary text-white'
                  : 'hover:bg-gray-100'
              )}
            >
              Personal Data
            </a>
          </DrawerClose>
          <DrawerClose asChild>
            <a
              href="#orders"
              onClick={() => handleClick('orders')}
              className={cn(
                'w-full px-4 py-2 border rounded-s2 text-center transition',
                active === 'orders'
                  ? 'bg-secondary text-white'
                  : 'hover:bg-gray-100'
              )}
            >
              My Orders
            </a>
          </DrawerClose>
          <Button
            onClick={() => {
              window.location.href = '/api/auth/signout';
            }}
            variant="link"
            className="text-red-500 mt-6 w-fit"
          >
            Quit Account →
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
