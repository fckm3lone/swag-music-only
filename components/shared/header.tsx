import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";
import Image from "next/image";
import { Button, Input } from "@/components/ui"; // shadcn компоненты

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
                        <h1 className="text-xl font-thin">SWAG MUSIC ONLY</h1>
                        <span className="absolute left-[160.5px] top-[7.7px] text-xl font-thin text-secondary-foreground">
              store
            </span>
                    </div>
                </div>

                {/* Правая часть */}
                <div className="flex items-center gap-4">
                    {showSearch && (
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-100 rounded-lg"
                        />
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
