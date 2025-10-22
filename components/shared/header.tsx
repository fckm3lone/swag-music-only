'use client'

import React from "react";
import {cn} from "@/lib/utils";
import {Container} from "@/components/shared/container";
import Image from "next/image";
import {SearchInput} from "@/components/shared/search-input";
import CartButton from "@/components/shared/cart-button";
import Link from "next/link";
import ProfileButton from "./profile-button";

import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";


interface HeaderProps {
    className?: string;
    showSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ className, showSearch = true }) => {
    const toastShown = React.useRef(false);
    const router = useRouter();
    const searchParams = useSearchParams()
React.useEffect(()=>{
    let toastMessage:string | undefined = undefined
    if(searchParams.has('verified')) toastMessage="Successfully verified";
    if(toastMessage) {
        setTimeout(()=> {
            router.replace("/");
            toast.success(toastMessage, { duration: 3000 });
        }, 600);
    }
    if(searchParams.has('notAuth')) {
        if (toastShown.current) return;

        if (searchParams.has("notAuth")) {
            toastShown.current = true;
            toast.error("User is not authenticated", { duration: 3000 });
            router.replace("/");
        }

    }
},[])

    return (
        <header className={cn("", className)}>
            <Container className="flex items-center justify-between py-6">
                {/* Левая часть */}
                <Link href="/">
                <div className="flex items-center gap-4 relative">
                    <Image alt="logo" src="/logo-next-music.png" width={50} height={50} />
                    <div className="relative">
                        <h1 className="text-xl font-thin max-[450px]:w-15">SWAG MUSIC ONLY</h1>
                        <span className="absolute left-[160.5px] top-[7.7px] text-xl font-thin text-secondary-foreground max-[450px]:top-[63px] max-[450px]:left-[38px]">
              store
            </span>
                    </div>
                </div>
                </Link>

                {/* Правая часть */}
                <div className="flex items-center gap-4">
                    {showSearch && <SearchInput />}
                    <CartButton/>


                    <ProfileButton/>
                </div>
            </Container>
        </header>
    );
};
