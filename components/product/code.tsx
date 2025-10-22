// // app/product/[slug]/page.tsx
//
// import { Container, PageTitle } from "@/components/shared";
// import { ProductImageGallery } from "@/components/product/product-gallery";
// import { ProductFeaturesPreview } from "@/components/product/product-features-preview";
// import { ProductPriceBlock } from "@/components/product/product-price-block";
// import { ProductDescription } from "@/components/product/product-description";
// import { ProductAllFeatures } from "@/components/product/product-all-features";
// import { notFound } from "next/navigation";
//
// import { Metadata } from "next";
// import { getProductBySlug, ProductPageType } from "@/services/products";
//
// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
//     const { slug } = await params;
//     const product = await getProductBySlug(slug);
//     if (!product) return { title: "Товар не найден" };
//
//     return {
//         title: `${product.name} - Музыкальный магазин`,
//         description: product.description?.slice(0, 160) || "",
//     };
// }
//
// export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
//     const { slug } = await params;
//
//     const product: ProductPageType | null = await getProductBySlug(slug);
//
//     if (!product) {
//         notFound();
//     }
//
//     const { name, price, images, features, description } = product;
//
//     return (
//         <Container>
//             <PageTitle title={name} />
//             <div className="max-[1520px]:px-5">
//                 <div className="flex gap-20 mt-10 max-[1095px]:gap-10 max-[876px]:flex-col">
//                     <ProductImageGallery images={images} />
//                     <div className="flex flex-col w-[320px] max-[876px]:w-full">
//                         <ProductFeaturesPreview features={features.slice(0, 8)} />
//                         <ProductPriceBlock price={Number(price)} />
//                     </div>
//                 </div>
//                 <div className="mt-20">
//                     <ProductDescription description={description} />
//                 </div>
//                 <div className="mt-12">
//                     <ProductAllFeatures features={features} />
//                 </div>
//             </div>
//         </Container>
//     );
// }
//
// //components/product/product-gallery.tsx
//
// "use client";
//
// import Image from "next/image";
// import { useState, useRef } from "react";
// import { useMedia } from "react-use";
// import { ChevronUp, ChevronDown } from "lucide-react";
// import { Skeleton } from "@/components/ui";
// import { ProductPageType } from "@/services/products";
//
// export function ProductImageGallery({
//                                         images,
//                                         isLoading,
//                                     }: ProductPageType & { isLoading?: boolean }) {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//
//     const scrollRef = useRef<HTMLDivElement>(null);
//
//     const isDesktop = useMedia("(min-width: 600px)", true);
//     const visibleImages = images.slice(currentIndex, currentIndex + 4);
//     const canScrollUp = currentIndex > 0;
//     const canScrollDown = currentIndex + 4 < images.length;
//
//     if (isLoading) {
//         return (
//             <div className="flex flex-col laptop:flex-row items-center gap-4 max-[876px]:gap-2">
//                 <div className="flex flex-col items-center gap-2 max-[876px]:flex-row max-[876px]:overflow-x-auto max-[876px]:w-full">
//                     {Array(4)
//                         .fill(0)
//                         .map((_, i) => (
//                             <Skeleton
//                                 key={i}
//                                 className="w-20 h-20 max-[876px]:min-w-20 rounded-s2"
//                             />
//                         ))}
//                 </div>
//                 <Skeleton className="w-[580px] h-[580px] max-[876px]:w-full max-[876px]:h-80 max-[400px]:h-64 rounded-s2" />
//             </div>
//         );
//     }
//
//     return (
//         <div className="flex flex-row max-[600px]:flex-col items-center justify-center gap-10 max-[600px]:gap-4">
//             {/* Миниатюры */}
//             <div
//                 ref={scrollRef}
//                 className="flex flex-col items-center gap-5
//                    max-[600px]:flex-row max-[600px]:overflow-x-auto
//                    max-[600px]:w-full max-[600px]:gap-4 max-[600px]:justify-start"
//             >
//                 {/* Стрелка вверх (только desktop) */}
//                 <button
//                     disabled={!canScrollUp}
//                     onClick={() => setCurrentIndex((i) => i - 1)}
//                     className="p-1 disabled:opacity-50 max-[600px]:hidden"
//                 >
//                     <ChevronUp className="w-6 h-6" />
//                 </button>
//
//                 {/* Desktop → slice(4), Mobile → все */}
//                 <div className="flex flex-col gap-5 max-[600px]:flex-row max-[600px]:gap-5">
//                     {(images.length > 0 ? (isDesktop ? visibleImages : images) : []).map(
//                         (src, i) => (
//                             <div
//                                 key={`${src.url}-${i}`}
//                                 className={`border rounded-s2 p-2 w-20 h-20 max-[600px]:min-w-20 max-[600px]:h-20 flex justify-center items-center cursor-pointer ${
//                                     images.indexOf(src) === selectedImageIndex
//                                         ? "border-gray-200"
//                                         : "border-border"
//                                 }`}
//                                 onClick={() => setSelectedImageIndex(images.indexOf(src))}
//                             >
//                                 <Image
//                                     src={src.url}
//                                     alt={`thumb-${i}`}
//                                     width={80}
//                                     height={80}
//                                     style={{
//                                         objectFit: "contain",
//                                         width: "100%",
//                                         height: "100%",
//                                     }}
//                                 />
//                             </div>
//                         )
//                     )}
//                 </div>
//
//                 {/* Стрелка вниз (только desktop) */}
//                 <button
//                     disabled={!canScrollDown}
//                     onClick={() => setCurrentIndex((i) => i + 1)}
//                     className="p-1 disabled:opacity-50 max-[600px]:hidden"
//                 >
//                     <ChevronDown className="w-6 h-6" />
//                 </button>
//             </div>
//
//             {/* Главное изображение */}
//             <div
//                 className="
//     border rounded-s2 p-2
//     flex justify-center items-center
//     aspect-square shrink-0
//     w-[580px]            /* десктоп */
//     max-[1024px]:w-[480px]  /* планшет */
//     max-[600px]:w-[480px]   /* маленький планшет */
//     max-[540px]:w-[420px]   /* маленький планшет */
//     max-[480px]:w-[380px]   /* мобильный */
//     max-[420px]:w-[320px]   /* мобильный */
//     max-[360px]:w-[280px]   /* мобильный */
//   "
//             >
//                 <Image
//                     src={images[selectedImageIndex].url}
//                     alt="main preview"
//                     width={580}
//                     height={580}
//                     className="object-contain w-full h-full"
//                 />
//             </div>
//         </div>
//     );
// }
//
//
// // components/product/product-features-preview.tsx
// "use client"
//
// import {Button, Skeleton} from "@/components/ui";
// import { FC } from "react";
// import {ProductPageType} from "@/services/products";
//
//
//
//
//
//
// export const ProductFeaturesPreview: React.FC<ProductPageType & { isLoading?: boolean }> = ({ features, isLoading }) => {
//     const displayed = features.slice(0, 8);
//
//     const scrollToFullFeatures = () => {
//         const section = document.getElementById("all-features");
//         if (section) {
//             section.scrollIntoView({ behavior: "smooth" });
//         }
//     };
//
//     if (isLoading) {
//         return (
//             <div className="w-full">
//                 <Skeleton className="h-6 w-1/4 mb-5" />
//                 <ul className="space-y-2">
//                     {Array(6).fill(0).map((_, i) => (
//                         <li key={i} className="flex gap-2">
//                             <Skeleton className="h-4 w-1/3" />
//                             <Skeleton className="h-4 w-2/3" />
//                         </li>
//                     ))}
//                 </ul>
//                 <Skeleton className="h-4 w-10 mt-4" />
//             </div>
//         );
//     }
//
//     return (
//         <div className="w-full">
//             <h3 className="font-medium text-xl mb-5 tracking-widest">Features</h3>
//             <ul className="text-md space-y-1.5 mb-4 max-[767px]:text-sm">
//                 {displayed.map((f, i) => (
//                     <li key={i}>
//                         <span className="text-foreground">{f.attribute.name}:</span>{" "}
//                         <span className={f.value === "нет" ? "text-secondary" : "text-secondary"}>
//                             {f.value}
//                         </span>
//                     </li>
//                 ))}
//             </ul>
//             {features.length > 6 && (
//                 <Button
//                     variant="link"
//                     onClick={scrollToFullFeatures}
//                     className="text-lg px-0 py-0 w-auto h-auto font-thin tracking-wide text-foreground"
//                 >
//                     ...
//                 </Button>
//             )}
//         </div>
//     );
// };
//
//
// // components/product/product-price.tsx
// "use client";
//
// import { FC } from "react";
// import {Button, Skeleton} from "@/components/ui";
// import { ShoppingCartIcon } from "lucide-react";
// import Image from "next/image";
//
// interface ProductPriceBlockProps {
//     price: number;
//     currency?: string; // по умолчанию "$"
//     onAddToCart?: () => void;
// }
//
// export const ProductPriceBlock: React.FC<ProductPriceBlockProps & { isLoading?: boolean }> = ({
//                                                                                                   price,
//                                                                                                   currency = "$",
//                                                                                                   onAddToCart,
//                                                                                                   isLoading,
//                                                                                               }) => {
//     if (isLoading) {
//         return (
//             <div className="mt-4 border-t border-border pt-4">
//                 <Skeleton className="h-6 w-1/4 mb-2" />
//                 <Skeleton className="h-8 w-32" />
//             </div>
//         );
//     }
//
//     const formatted = price.toFixed(2).replace(".", ",");
//
//     return (
//         <div className="mt-4 pt-4">
//             {/* короткая линия сверху */}
//             <div className="w-full border-t border-border mb-4"></div>
//
//             <div className="text-xl font-medium text-left mt-4 mb-2 max-[767px]:text-lg">
//                 {formatted} <span className="text-secondary font-regular">{currency}</span>
//             </div>
//
//             <Button
//                 variant="link"
//                 onClick={onAddToCart}
//                 className="w-auto p-0 text-secondary cursor-pointer gap-2 uppercase text-2xl font-regular justify-start max-[767px]:text-xl"
//             >
//                 TO CART
//                 <Image src="/cart.png" alt="🗑️" width={25} height={25} />
//             </Button>
//         </div>
//
//     );
// };
//
//
//
// // components/product/product-description.tsx
// "use client";
//
// import React from "react";
// import {Skeleton} from "@/components/ui";
//
// interface ProductDescriptionProps {
//     description: string;
// }
//
// export const ProductDescription: React.FC<ProductDescriptionProps & { isLoading?: boolean }> = ({ description, isLoading }) => {
//     if (isLoading) {
//         return (
//             <section className="w-full">
//                 <Skeleton className="h-6 w-1/4 mb-4" />
//                 <Skeleton className="h-4 w-full mb-2" />
//                 <Skeleton className="h-4 w-3/4" />
//             </section>
//         );
//     }
//
//     return (
//         <section className="w-full">
//             <h2 className="text-xl tracking-widest font-medium mb-4 max-[767px]:text-lg">DESCRIPTION</h2>
//             <p className="text-md text-muted-foreground leading-relaxed whitespace-pre-line max-[767px]:text-sm">
//                 {description}
//             </p>
//         </section>
//     );
// };
//
//
// // components/product/product-all-features.tsx
// "use client";
//
// import React from "react";
// import {ProductPageType} from "@/services/products";
// import {Skeleton} from "@/components/ui";
//
//
// interface Feature {
//     label: string;
//     value: string;
// }
//
// interface ProductAllFeaturesProps {
//     features: Feature[];
// }
// export const ProductAllFeatures: React.FC<ProductPageType & { isLoading?: boolean }> = ({ features, isLoading }) => {
//     if (isLoading) {
//         return (
//             <section id="all-features" className="w-full">
//                 <Skeleton className="h-6 w-1/4 mb-4" />
//                 <div className="grid grid-cols-1 laptop:grid-cols-2 gap-y-2 gap-x-8">
//                     {Array(8).fill(0).map((_, i) => (
//                         <div key={i} className="flex justify-between border-b pb-1">
//                             <Skeleton className="h-4 w-1/3" />
//                             <Skeleton className="h-4 w-1/2" />
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         );
//     }
//
//     return (
//         <section id="all-features" className="w-full">
//             <h2 className="text-xl font-medium tracking-widest mb-4 max-[767px]:text-lg">ALL FEATURES</h2>
//             <div className="grid grid-cols-1 laptop:grid-cols-2 gap-y-2 gap-x-8 max-[767px]:gap-x-4">
//                 {features.map((feature) => (
//                     <div key={feature.attribute.name} className="flex justify-between border-b pb-1 text-sm max-[767px]:text-xs">
//                         <span className="text-muted-foreground">{feature.attribute.name}</span>
//                         <span className="text-right font-medium text-foreground truncate max-w-[200px] max-[767px]:max-w-[150px]">
//                             {feature.value}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };
