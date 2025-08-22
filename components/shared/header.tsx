'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import Image from "next/image";
import { Button, Input } from "@/components/ui"; // shadcn компоненты
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "@/components/ui/drawer";

interface HeaderProps {
    className?: string;
    showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ className, showSearch = true }) => {
    return (
        <header className={cn("", className)}>
            <Container className="flex items-center justify-between py-6">
                {/* Левая часть */}
                <div className="flex items-center gap-4 relative">
                    <Image alt="logo" src="/logo-next-music.png" width={50} height={50} />
                    <div className="relative">
                        <h1 className="text-xl font-thin max-[450px]:w-15">SWAG MUSIC ONLY</h1>
                        <span className="absolute left-[160.5px] top-[7.7px] text-xl font-thin text-secondary-foreground max-[450px]:top-[63px] max-[450px]:left-[38px]">
              store
            </span>
                    </div>
                </div>

                {/* Правая часть */}
                <div className="flex items-center gap-4">
                    {/* Search input: hidden on small screens, visible on md+ */}
                    {showSearch && (
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-100 rounded-lg hidden min-[780px]:block"
                        />
                    )}
                    {/* Magnifier icon: visible on small screens only, opens Drawer with search */}
                    {showSearch && (
                        <Drawer direction="top">
                            <DrawerTrigger asChild>
                                <Button variant="header_ghost" size="icon" className="bg-transparent p-0 block min-[780px]:hidden">
                                    <Image src="/search-glass.png" alt="Search" width={32} height={32} />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="p-4 max-w-md mx-auto">
                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full rounded-lg mb-2"
                                    autoFocus
                                />
                               
                            </DrawerContent>
                        </Drawer>
                    )}
                    <Button variant="header_ghost" size="icon" className="bg-transparent p-0">
                        <Image src="/cart.png" alt="Cart" width={40} height={40} />
                    </Button>
                    <Button variant="header_ghost" size="icon" className="bg-transparent p-0">
                        <Image src="/profile.png" alt="Profile" width={40} height={40} />
                    </Button>
                </div>
            </Container>
        </header>
    );
};
