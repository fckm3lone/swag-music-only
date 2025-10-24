export enum UserRole {
    USER,
    ADMIN,
}

export enum OrderStatus {
    PENDING,
    PAID,
    CANCELED,
}

export type PublicUser = {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: UserRole;
    verified: Date | null;
    provider: string | null;
    providerId: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type PublicCart = {
    id: number;
    userId: number | null;
    token: string;
    totalAmount: any; // Decimal
    totalCount: number;
    createdAt: Date;
    updatedAt: Date;
};

export type PublicCartItem = {
    id: number;
    cartId: number;
    productId: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
};

export type PublicOrder = {
    id: number;
    userId: number | null;
    totalAmount: any; // Decimal
    totalCount: number;
    status: OrderStatus;
    paymentId: string | null;
    fullName: string;
    email: string;
    phone: string;
    adress: string;
    deliveryTime: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type PublicOrderItem = {
    id: number;
    orderId: number;
    productId: number;
    name: string;
    quantity: number;
};

export type PublicCategory = {
    id: number;
    name: string;
};

export type PublicBrand = {
    id: number;
    name: string;
};

export type PublicColor = {
    id: number;
    name: string;
};

export type PublicType = {
    id: number;
    name: string;
    categoryId: number;
};

export type PublicProduct = {
    id: number;
    name: string;
    description: string;
    price: any; // Decimal
    slug: string;
    categoryId: number;
    brandId: number | null;
    availability: string | null;
    colorId: number | null;
    typeId: number | null;
    createdAt: Date;
    updatedAt: Date;
};

export type PublicProductImage = {
    id: number;
    url: string;
    productId: number;
};

export type PublicAttributeGroup = {
    id: number;
    name: string;
    categoryId: number;
};

export type PublicAttribute = {
    id: number;
    name: string;
    attributeGroupId: number;
};

export type PublicProductAttribute = {
    id: number;
    value: string;
    productId: number;
    attributeId: number;
};

export type PublicVerificationCode = {
    id: number;
    userId: number | null;
    email: string | null;
    phone: string | null;
    code: string;
    type: string;
    expiresAt: Date | null;
    used: boolean;
    createdAt: Date;
};