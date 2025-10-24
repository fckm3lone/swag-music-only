import {
    PublicOrder,
    PublicOrderItem,
    PublicProduct,
    PublicProductImage
} from "@/types/public";

export type OrderWithImage = PublicOrder & {
    items: OrderItemWithProduct[];


}

export type OrderItemWithProduct = PublicOrderItem & {
    product: ProductWithImage
}

export type ProductWithImage = PublicProduct & {
    images: PublicProductImage[]
}