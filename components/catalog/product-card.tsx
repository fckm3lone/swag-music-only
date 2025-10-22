// components/catalog/product-card.tsx
'use client'
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useCartService} from "@/hooks/useCartService";


interface ProductCardProps {
    id: number;
    name: string;
    price: number; // 👈 число, не Decimal
    images: { url: string }[];
    slug: string;
}



export const ProductCard = ({id, name, price, images, slug }: ProductCardProps) => {

    const imageUrl = images.length > 0 ? images[0].url : "/placeholder-image.png";

    const {useAddItem} = useCartService()

    const addItemMutation = useAddItem();

    const handleAddToCart = (id: number) => {
        addItemMutation.mutate({productId: id, quantity: 1})

    }



    return (
        <div className="group cursor-pointer">
            <div className="flex flex-col items-start text-left transition-all duration-200 group-hover:scale-110">
                <Link href={`/product/${slug}`} className="w-full">
                    <div className="bg-card w-[190px] h-[190px] flex items-center justify-center rounded-2xl overflow-hidden mb-2">
                        <Image
                            src={imageUrl}
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
                </Link>

                <Button
                    variant="link"
                    className="text-secondary-foreground w-auto px-0 py-0 text-left text-lg font-regular uppercase mt-2"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(id);
                    }}
                >
                    To Cart
                </Button>
            </div>
        </div>
    );
};