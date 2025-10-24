'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Drawer, DrawerContent, DrawerTrigger} from '@/components/ui/drawer';
import {Search} from 'lucide-react';
import {useClickAway} from 'react-use';
import {useQuery} from '@tanstack/react-query';
import {cn} from '@/lib/utils';
import {generateSlug} from '@/services/generateSlug';
import {Spinner} from "@/components/ui/spinner";
import {ProductWithImage} from "@/types/order";

interface SearchInputProps {
    className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [focused, setFocused] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    useClickAway(ref, () => setFocused(false));

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['search', searchQuery],
        queryFn: () =>
            fetch(`/api/products/search?query=${encodeURIComponent(searchQuery.trim())}`)
                .then((res):Promise<ProductWithImage[]> => res.json()),
        enabled: !!searchQuery.trim(),
    });

    const onClickItem = () => {
        setFocused(false);
        setSearchQuery('');
    };

    return (
        <>
            {focused && <div className="fixed inset-0 bg-black/50 z-40" />}
            <div ref={ref} className={cn('relative z-50', className)}>
                {/* Десктоп */}
                <div className="relative w-100 hidden min-[780px]:block">
                    {isLoading ? (<Spinner className="absolute top-1/2 -translate-y-1/2 left-2 h-5 text-gray-400"/>) : (<Search className="absolute top-1/2 -translate-y-1/2 left-3 h-5 text-gray-400" />)}
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-full rounded-lg pl-10 bg-white"
                        value={searchQuery}
                        onFocus={() => setFocused(true)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Escape' && setFocused(false)}
                    />
                    {isLoading ? (
                        <></>
                    ) : products.length > 0 ? (
                        <div
                            className={cn(
                                'absolute left-0 right-0 bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-50',
                                focused && 'visible opacity-100 top-12'
                            )}
                        >
                            {products.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/product/${generateSlug(p.name)}`}
                                    onClick={onClickItem}
                                    className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                                >
                                    <div className="w-[50px] h-[50px] flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={p.images[0]?.url ?? '/placeholder.png'}
                                        alt={p.name}
                                        width={50}
                                        height={50}
                                        className="object-contain w-full h-full"
                                    />
                                    </div>
                                    <span>{p.name}</span>
                                </Link>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Мобильный Drawer */}
                <Drawer direction="top">
                    <DrawerTrigger asChild>
                        <Button
                            variant="header_ghost"
                            size="icon"
                            className="bg-transparent p-0 block min-[780px]:hidden"
                            onClick={() => setFocused(true)}
                        >
                            <Search className="absolute top-1/2 -translate-y-1/2 left-3  text-gray-400" />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent className="p-4 max-w-md mx-auto">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-lg mb-2 bg-white"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {isLoading ? (
                            <></>
                        ) : products.length > 0 ? (
                            <div className="mt-2 space-y-2">
                                {products.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/product/${generateSlug(p.name)}`}
                                        onClick={onClickItem}
                                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 rounded-lg"
                                    >
                                        <Image
                                            src={p.images[0]?.url ?? '/placeholder.png'}
                                            alt={p.name}
                                            width={40}
                                            height={40}
                                            className=""
                                        />
                                        <span>{p.name}</span>
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
};