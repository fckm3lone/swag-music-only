import {Order, OrderItem, Product, ProductImage} from "@prisma/client";

export type OrderWithImage = Order & {
    items: OrderItemWithProduct[];


}

export type OrderItemWithProduct = OrderItem & {
    product: ProductWithImage
}

export type ProductWithImage = Product & {
    images: ProductImage[]
}