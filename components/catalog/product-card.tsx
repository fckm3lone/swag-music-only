'use client'

// components/product/product-card.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";

const generateSlug = (name: string): string => {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
};

export const ProductCard = ({ id, name, price, image }: Product) => {
    const slug = generateSlug(name);

    return (
        <Link href={`/product/${slug}`} className="group">
            <div className="flex flex-col items-start text-left group-hover:scale-110 transition-all duration-200">
                <div className="bg-card w-[190px] h-[190px] flex items-center justify-center rounded-2xl overflow-hidden mb-2">
                    <Image
                        src={image}
                        alt={name}
                        width={320}
                        height={320}
                        style={{
                            objectFit: "contain",
                            maxWidth: "320px",
                            maxHeight: "320px",
                            width: "auto",
                            height: "auto",
                        }}
                    />
                </div>
                <p className="text-foreground text-md font-regular mb-1">
                    {price}
                    <span className="text-secondary-foreground text-lg font-regular mb-1"> $</span>
                </p>
                <h3 className="text-md text-foreground">{name}</h3>
                <Button
                    variant="link"
                    className="text-secondary-foreground w-auto px-0 py-0 text-left text-lg font-regular uppercase"
                    onClick={(e) => e.preventDefault()}
                >
                    To Cart
                </Button>
            </div>
        </Link>
    );
};